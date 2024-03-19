"use server";

import * as z from "zod";

import { getUserByEmail } from "@/data/user";
import { sendPasswordResetEmail } from "@/lib/auth/mail";
import { generatePasswordResetToken } from "@/lib/auth/tokens";
import connectDB from "@/model/connect/db";
import { ResetSchema } from "@/model/auth/zod";

export const reset = async (values: z.infer<typeof ResetSchema>) => {
  await connectDB();
  const validatedFields = ResetSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Invalid email!" };
  }

  const { email } = validatedFields.data;

  const existingUser = await getUserByEmail(email);

  if (!existingUser) {
    return { error: "Email not found!" };
  }

  if (email) {
    const passwordResetToken = await generatePasswordResetToken(email);
    if (passwordResetToken && typeof passwordResetToken.email === 'string' && passwordResetToken.token) {
      await sendPasswordResetEmail(
        passwordResetToken.email,
        passwordResetToken.token,
      );

      return { success: "Reset email sent!" };
    } else {
      return { error: "Reset email or token is not defined!" };
    }
  } else {
    return { error: "Email is not defined!" };
  }
}