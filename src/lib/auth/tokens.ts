// import crypto from "crypto";
// import { v4 as uuidv4 } from "uuid";
// import PasswordResetToken from "@/model/auth/reset-token";
// import TwoFactorToken from "@/model/auth/factor-token";
// import VerificationToken  from "@/model/auth/verifiaction-token";
// import { getVerificationTokenByEmail } from "@/data/verificiation-token";
// import { getPasswordResetTokenByEmail } from "@/data/password-reset-token";
// import { getTwoFactorTokenByEmail } from "@/data/two-factor-token";

// export const generateTwoFactorToken = async (email: string) => {
//   const token = crypto.randomInt(100_000, 1_000_000).toString();
//   const expires = new Date(new Date().getTime() + 5 * 60 * 1000);

//   const existingToken = await getTwoFactorTokenByEmail(email);

//   if (existingToken) {
//     await TwoFactorToken.findByIdAndDelete(existingToken.id);
//   }

//   const twoFactorToken = await TwoFactorToken.create({
//     email,
//     token,
//     expires,
//   });

//   return twoFactorToken;
// }

// export const generatePasswordResetToken = async (email: string) => {
//   const token = uuidv4();
//   const expires = new Date(new Date().getTime() + 3600 * 1000);

//   const existingToken = await getPasswordResetTokenByEmail(email);

//   if (existingToken) {
//     await PasswordResetToken.findByIdAndDelete(existingToken.id);
//   }

//   const passwordResetToken = await PasswordResetToken.create({
//     email,
//     token,
//     expires
//   });

//   return passwordResetToken;
// }

// export const generateVerificationToken = async (email: string) => {
//   const token = uuidv4();
//   const expires = new Date(new Date().getTime() + 24 * 3600 * 1000);

//   const existingToken = await getVerificationTokenByEmail(email);

//   if (existingToken) {
//     await VerificationToken.findByIdAndDelete(existingToken.id);
//   }

//   const verficationToken = await VerificationToken.create({
//     email,
//     token,
//     expires,
//   });

//   return verficationToken;
// };