import bcrypt from "bcryptjs";
import type { NextAuthConfig, User as NextAuthUser } from "next-auth";
import Credentials from "next-auth/providers/credentials";

import User from "@/model/auth/user";
import { LoginSchema } from "@/model/auth/zod";


export default {
  providers: [
    Credentials({
      // Define the fields in the sign-in form
      credentials: {
        email: { label: "Email", type: "text", placeholder: "jsmith@example.com" },
        password: {  label: "Password", type: "password" }
      },
      async authorize(credentials, req) {
        const validatedFields = LoginSchema.safeParse(credentials);

        if (validatedFields.success) {
          const { email, password } = validatedFields.data;
          
          // // Use Mongoose's findOne method to get the user by email
          const user = await User.findOne({ email });
          // if (!user || !user.password) return null;

          // const passwordsMatch = await bcrypt.compare(
          //   password,
          //   user.password,
          // );

          // if (passwordsMatch) {
          //   // Convert the Mongoose document to a plain JavaScript object
          //   const userObj = user.toObject();
          //   // Return a NextAuth User object
          //   return {
          //     name: userObj.name,
          //     email: userObj.email,
          //   } as NextAuthUser;
          // }
        }

        return null;
      }
    })
  ],
} as NextAuthConfig;