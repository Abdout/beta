"use server";

import * as z from "zod";
import bcrypt from "bcryptjs";


import { getPasswordResetTokenByToken } from "@/data/password-reset-token";
import { getUserByEmail } from "@/data/user";
import  PasswordResetToken from "@/model/auth/reset-token";
import User from "@/model/auth/user";
import connectDB from "@/model/connect/db";
import { NewPasswordSchema } from "@/model/auth/zod";

export const newPassword = async (
  values: z.infer<typeof NewPasswordSchema> ,
  token?: string | null,
) => {
  await connectDB();
  if (!token) {
    return { error: "Missing token!" };
  }

  const validatedFields = NewPasswordSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Invalid fields!" };
  }

  const { password } = validatedFields.data;

  const existingToken = await getPasswordResetTokenByToken(token);

  if (!existingToken) {
    return { error: "Invalid token!" };
  }

  const hasExpired = existingToken.expires ? new Date(existingToken.expires) < new Date() : false;

  if (hasExpired) {
    return { error: "Token has expired!" };
  }

  if (existingToken.email) {
    const existingUser = await getUserByEmail(existingToken.email);

    if (!existingUser) {
      return { error: "Email does not exist!" }
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await User.findByIdAndUpdate(existingUser.id, { password: hashedPassword });

    await PasswordResetToken.findByIdAndDelete(existingToken.id);

    return { success: "Password updated!" };
  } else {
    return { error: "Email is not defined!" };
  }
};