"use server";

import { currentRole } from "@/lib/auth/auth";
import { UserRole } from "@/lib/auth/role";
import connectDB from "@/model/connect/db";



export const admin = async () => {
  await connectDB();
  const role = await currentRole();

  if (role === UserRole.ADMIN) {
    return { success: "Allowed Server Action!" };
  }

  return { error: "Forbidden Server Action!" }
};