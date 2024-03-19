"use server";

import * as z from "zod";
import bcrypt from "bcryptjs";

import User from "@/model/auth/user";

import { getUserByEmail } from "@/data/user";
import { sendVerificationEmail } from "@/lib/auth/mail";
import { generateVerificationToken } from "@/lib/auth/tokens";
import connectDB from "@/model/connect/db";
import { RegisterSchema } from "@/model/auth/zod";

export const register = async (values: z.infer<typeof RegisterSchema>) => {

  await connectDB();
  
  const validatedFields = RegisterSchema.safeParse(values);

  // If validation fails, return an error
  if (!validatedFields.success) {
    return { error: "Invalid fields!" };
  }

  // Extract the validated fields
  const { email, password, name } = validatedFields.data;

  // Hash the password
  const hashedPassword = await bcrypt.hash(password, 10);

  // Check if a user with the same email already exists
  const existingUser = await getUserByEmail(email);

  // If a user with the same email exists, return an error
  if (existingUser) {
    return { error: "Email already in use!" };
  }

  // Create a new user
  console.log('About to create user...');
  await User.create({
    name,
    email,
    password: hashedPassword,
  });

    if (email) {
      const verificationToken = await generateVerificationToken(email);
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
  } // Add this closing curly brace
