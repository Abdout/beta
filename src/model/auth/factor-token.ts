import mongoose, { Schema } from 'mongoose';

const TwoFactorTokenSchema = new Schema({
  email: String,
  token: String,
  expires: Date,
});

let TwoFactorToken: any;
if (mongoose.models?.TwoFactorToken) {
  TwoFactorToken = mongoose.model('TwoFactorToken');
} else {
  TwoFactorToken = mongoose.model('TwoFactorToken', TwoFactorTokenSchema);
}

export default TwoFactorToken;