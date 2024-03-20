// /api/authorize.ts
import { NextApiRequest, NextApiResponse } from 'next';
import bcrypt from "bcryptjs";
import User from "@/model/auth/user";
import connectDB from "@/model/connect/db";
import { LoginSchema } from "@/model/auth/zod";

export default async function authorize(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const validatedFields = LoginSchema.safeParse(req.body);

    if (validatedFields.success) {
      const { email, password } = validatedFields.data;
      console.log(`Credentials: ${email}, ${password}`); // Log the credentials

      // Connect to the database
      await connectDB();

      // Use the refactored User model to get the user by email
      const user = await User.findOne({ email });
      console.log(`User found: ${!!user}`); // Log whether a user was found

      if (!user || !user.password) {
        res.status(401).json({ message: 'Invalid credentials' });
        return;
      }

      const passwordsMatch = await bcrypt.compare(password, user.password);
      console.log(`Passwords match: ${passwordsMatch}`); // Log whether the passwords match

      if (!passwordsMatch) {
        res.status(401).json({ message: 'Invalid credentials' });
        return;
      }

      res.status(200).json({
        name: user.name,
        email: user.email,
      });
    } else {
      res.status(400).json({ message: 'Invalid request' });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}