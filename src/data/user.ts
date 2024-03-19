import User from "@/model/auth/user";

export const getUserByEmail = async (email: string) => {
  try {
    const user = await User.findOne({ email: email });
    console.log('User fetched by email:', user); // Added console log

    return user;
  } catch (error) {
    console.error('Error fetching user by email:', error); // Added console log
    return null;
  }
};

export const getUserById = async (id: string) => {
  try {
    console.log('Fetching user with ID:', id);
    const user = await User.findById(id);
    console.log('Fetched user:', user);
    return user;
  } catch (error) {
    console.log('Error fetching user by ID:', error);
    return null;
  }
};

export const updateUserByEmail = async (email: string, values: any) => {
  const user = await User.findOneAndUpdate({ email }, values, { new: true });
  return user;
};