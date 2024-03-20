// /api/authorize.ts
import { NextApiRequest, NextApiResponse } from 'next';
import bcrypt from "bcryptjs";
import User from "@/model/auth/user";
import connectDB from "@/model/connect/db";
import { LoginSchema } from "@/model/auth/zod";

export default async function authorize(req: NextApiRequest, res: NextApiResponse) {
  console.log('Authorize function called'); // Log when the function is called

  if (req.method === 'POST') {
    console.log('POST request received'); // Log when a POST request is received

    const validatedFields = LoginSchema.safeParse(req.body);
    console.log('Fields validated'); // Log when the fields have been validated

    if (validatedFields.success) {
      const { email, password } = validatedFields.data;
      console.log(`Credentials: ${email}, ${password}`); // Log the credentials

      // Connect to the database
      await connectDB();
      console.log('Connected to database'); // Log when the database connection is successful

      // Use the refactored User model to get the user by email
      const user = await User.findOne({ email });
      console.log(`User found: ${!!user}`); // Log whether a user was found

      if (!user || !user.password) {
        console.log('No user found or user has no password'); // Log when no user is found or the user has no password
        res.status(401).json({ message: 'Invalid credentials' });
        return;
      }

      const passwordsMatch = await bcrypt.compare(password, user.password);
      console.log(`Passwords match: ${passwordsMatch}`); // Log whether the passwords match

      if (!passwordsMatch) {
        console.log('Passwords do not match'); // Log when the passwords do not match
        res.status(401).json({ message: 'Invalid credentials' });
        return;
      }

      res.status(200).json({
        name: user.name,
        email: user.email,
      });
      console.log('Response sent'); // Log when the response is sent
    } else {
      console.log('Validation failed'); // Log when validation fails
      res.status(400).json({ message: 'Invalid request' });
    }
  } else {
    console.log('Non-POST request received'); // Log when a non-POST request is received
    res.status(405).json({ message: 'Method not allowed' });
  }
}