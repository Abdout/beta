"use server";

import VerificationToken from "@/model/auth/verifiaction-token";
import User from "@/model/auth/user";
import { getUserByEmail } from "@/data/user";
import { getVerificationTokenByToken } from "@/data/verificiation-token";
import connectDB from "@/model/connect/db";

export const newVerification = async (token: string) => {
  await connectDB();
  const existingToken = await getVerificationTokenByToken(token);

  if (!existingToken) {
    return { error: "Token does not exist!" };
  }

  const hasExpired = existingToken.expires ? new Date(existingToken.expires) < new Date() : false;

  if (hasExpired) {
    return { error: "Token has expired!" };
  }

  if (existingToken.email) {
    const existingUser = await getUserByEmail(existingToken.email);

    if (!existingUser) {
      return { error: "Email does not exist!" };
    }

    await User.findByIdAndUpdate(existingUser.id, { 
      emailVerified: new Date(),
      email: existingToken.email,
    });


    // one time usage !
    await VerificationToken.findByIdAndDelete(existingToken.id);

    return { success: "Email verified!" };
  } else {
    return { error: "Email is not defined!" };
  }
};