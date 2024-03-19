import mongoose, { Schema } from 'mongoose';

const PasswordResetTokenSchema = new Schema({
  email: String,
  token: String,
  expires: Date,
});

let PasswordResetToken: any;
if (mongoose.models?.PasswordResetToken) {
  PasswordResetToken = mongoose.model('PasswordResetToken');
} else {
  PasswordResetToken = mongoose.model('PasswordResetToken', PasswordResetTokenSchema);
}

export default PasswordResetToken;