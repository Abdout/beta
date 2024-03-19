import User from "@/model/auth/user";

export const getAccountByUserId = async (userId: string) => {
  try {
    const account = await User.findOne({ userId: userId });

    return account;
  } catch {
    return null;
  }
};