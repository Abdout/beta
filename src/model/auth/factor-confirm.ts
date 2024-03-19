import mongoose, { Schema } from 'mongoose';

const TwoFactorConfirmationSchema = new Schema({
  userId: mongoose.Schema.Types.ObjectId,
  confirmed: Boolean,
});

let TwoFactorConfirmation:any;
if (mongoose.models?.TwoFactorConfirmation) {
  TwoFactorConfirmation = mongoose.model('TwoFactorConfirmation');
} else {
  TwoFactorConfirmation = mongoose.model('TwoFactorConfirmation', TwoFactorConfirmationSchema);
}

export default TwoFactorConfirmation;

