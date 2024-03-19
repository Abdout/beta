import mongoose, { Schema } from 'mongoose';

const VerificationTokenSchema = new Schema({
  email: String,
  token: String,
  expires: Date,
});

let VerificationToken: any;
if (mongoose.models?.VerificationToken) {
  VerificationToken = mongoose.model('VerificationToken');
} else {
  VerificationToken = mongoose.model('VerificationToken', VerificationTokenSchema);
}

export default VerificationToken;