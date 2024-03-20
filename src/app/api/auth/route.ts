// src/app/api/auth/route.ts
import { NextApiRequest, NextApiResponse } from 'next';
import bcrypt from "bcryptjs";
import User from "@/model/auth/user";
import { LoginSchema } from "@/model/auth/zod";

export default async function(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const validatedFields = LoginSchema.safeParse(req.body);

  if (!validatedFields.success) {
    return res.status(400).json({ message: 'Invalid request' });
  }

  const { email, password } = validatedFields.data;

  const user = await User.findOne({ email });
  if (!user || !user.password) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }

  const passwordsMatch = await bcrypt.compare(password, user.password);

  if (!passwordsMatch) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }

  // Return a NextAuth User object
  return res.status(200).json({
    name: user.name,
    email: user.email,
  });
}