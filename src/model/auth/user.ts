// user.ts
import mongoose, { Schema } from 'mongoose';

const UserSchema = new Schema({
  name: String,
  email: String,
  password: String,
  emailVerified: Date,
  role: {
    type: String,
    enum: ['USER', 'ADMIN'],
    default: 'USER'
  },
  isTwoFactorEnabled: Boolean,
});

const User = mongoose.models.User || mongoose.model('User', UserSchema);

export default User;