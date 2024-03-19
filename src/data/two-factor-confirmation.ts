import TwoFactorConfirmation from "@/model/auth/factor-confirm";

export const getTwoFactorConfirmationByUserId = async (userId: string) => {
  try {
    const twoFactorConfirmation = await TwoFactorConfirmation.findOne({ userId: userId });

    return twoFactorConfirmation;
  } catch {
    return null;
  }
};