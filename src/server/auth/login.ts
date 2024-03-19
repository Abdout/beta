"use server";

import * as z from "zod";
import { AuthError } from "next-auth";
import { signIn } from "../../auth";;

import { getUserByEmail } from "@/data/user";
import { getTwoFactorTokenByEmail } from "@/data/two-factor-token";
import { 
  sendVerificationEmail,
  sendTwoFactorTokenEmail,
} from "@/lib/auth/mail";

import { 
  generateVerificationToken,
  generateTwoFactorToken
} from "@/lib/auth/tokens";
import { 
  getTwoFactorConfirmationByUserId
} from "@/data/two-factor-confirmation";
import TwoFactorConfirmation from "@/model/auth/factor-confirm";
import TwoFactorToken  from "@/model/auth/factor-token";
import connectDB from "@/model/connect/db";
import { LoginSchema } from "@/model/auth/zod";
import { DEFAULT_LOGIN_REDIRECT } from "../../routes";

export const login = async (
  values: z.infer<typeof LoginSchema>,
  callbackUrl?: string | null,
) => {
  console.log('login function started');
  await connectDB();
  const validatedFields = LoginSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Invalid fields!" };
  }

  const { email, password, code } = validatedFields.data;

  console.log('Calling getUserByEmail');

  const existingUser = await getUserByEmail(email);

  if (!existingUser || !existingUser.email || !existingUser.password) {
    return { error: "Email does not exist!" }
  }

  if (!existingUser.emailVerified) {
    if (existingUser.email) {
      const verificationToken = await generateVerificationToken(existingUser.email);
      if (verificationToken && typeof verificationToken.email === 'string' && verificationToken.token) {
        await sendVerificationEmail(
          verificationToken.email,
          verificationToken.token,
        );

        return { success: "Confirmation email sent!" };
      } else {
        return { error: "Verification email or token is not defined!" };
      }
    } else {
      return { error: "Email is not defined!" };
    }
  }

  if (existingUser.isTwoFactorEnabled && existingUser.email) {
    if (code) {
      const twoFactorToken = await getTwoFactorTokenByEmail(existingUser.email);

      if (!twoFactorToken) {
        return { error: "Invalid code!" };
      }

      if (twoFactorToken.token !== code) {
        return { error: "Invalid code!" };
      }

      const hasExpired = twoFactorToken.expires ? new Date(twoFactorToken.expires) < new Date() : false;

      if (hasExpired) {
        return { error: "Code expired!" };
      }

      await TwoFactorToken.findByIdAndDelete(twoFactorToken.id);

      const existingConfirmation = await getTwoFactorConfirmationByUserId(existingUser.id);

      if (existingConfirmation) {
        await TwoFactorConfirmation.findByIdAndDelete(existingConfirmation.id);
      }

      await TwoFactorConfirmation.create({
        userId: existingUser.id,
      });
    } else {
      const twoFactorToken = await generateTwoFactorToken(existingUser.email)
      if (twoFactorToken && typeof twoFactorToken.email === 'string' && twoFactorToken.token) {
        await sendTwoFactorTokenEmail(
          twoFactorToken.email,
          twoFactorToken.token,
        );

        return { twoFactor: true };
      } else {
        return { error: "Two-factor email or token is not defined!" };
      }
    }
  }

  try {
    console.log('Attempting to sign in with email:', email);
    await signIn("credentials", {
      email,
      password,
      redirectTo: callbackUrl || DEFAULT_LOGIN_REDIRECT,
    })
    console.log('Sign in successful');
  } catch (error) {
    console.log('signIn error:', error);
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          console.log('Sign in failed due to invalid credentials');
          return { error: "Invalid credentials!" }
        default:
          console.log('Sign in failed due to an unknown error');
          return { error: "Something went wrong!" }
      }
    }
  
    throw error;
  }
};