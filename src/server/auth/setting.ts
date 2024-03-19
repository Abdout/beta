// "use server";

// import * as z from "zod";
// import bcrypt from "bcryptjs";
// import { getUserByEmail, updateUserByEmail } from "@/data/user";
// import { currentUser } from "@/lib/auth/auth";
// import { generateVerificationToken } from "@/lib/auth/tokens";
// import { sendVerificationEmail } from "@/lib/auth/mail";
// import connectDB from "@/model/connect/db";
// import { signIn, update } from "../../auth";
// import { SettingsSchema } from "@/model/auth/zod";

// export const settings = async (
//   values: z.infer<typeof SettingsSchema>
// ) => {
//   await connectDB();
//   const user = await currentUser();

//   if (!user || !user.email) {
//     return { error: "Unauthorized" }
//   }
  
//   const dbUser = await getUserByEmail(user.email);

//   if (!dbUser) {
//     return { error: "Unauthorized" }
//   }

//   if (user.isOAuth) {
//     values.email = undefined;
//     values.password = undefined;
//     values.newPassword = undefined;
//     values.isTwoFactorEnabled = undefined;
//   }

//   if (values.email && values.email !== user.email) {
//     const existingUser = await getUserByEmail(values.email);

//     if (existingUser && existingUser.id !== user.id) {
//       return { error: "Email already in use!" }
//     }

//     const verificationToken = await generateVerificationToken(
//       values.email
//     );
//     await sendVerificationEmail(
//       verificationToken.email,
//       verificationToken.token,
//     );

//     return { success: "Verification email sent!" };
//   }

//   if (values.password && values.newPassword && dbUser.password) {
//     const passwordsMatch = await bcrypt.compare(
//       values.password,
//       dbUser.password,
//     );

//     if (!passwordsMatch) {
//       return { error: "Incorrect password!" };
//     }

//     const hashedPassword = await bcrypt.hash(
//       values.newPassword,
//       10,
//     );
//     values.password = hashedPassword;
//     values.newPassword = undefined;
//   }

//   const updatedUser = await updateUserByEmail(user.email, values);

//   // Trigger the session callback with the updated user information
//   const session = await signIn('credentials', { 
//     callbackUrl: '/', 
//     data: { 
//       email: updatedUser.email, 
//       password: values.password // Use the user's password as the credential
//     } 
//   });

//   // Update the session with the updated user information
//   await update(session, {
//     name: updatedUser.name,
//     email: updatedUser.email,
//     isTwoFactorEnabled: updatedUser.isTwoFactorEnabled,
//     role: updatedUser.role,
//   });

//   return { success: "Settings Updated!" }
// }