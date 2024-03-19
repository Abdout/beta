// import mongoose, { Schema } from 'mongoose';

// const UserSchema = new Schema({
//   name: String,
//   email: String,
//   password: String,
//   emailVerified: Date,
//   role: {
//     type: String,
//     enum: ['USER', 'ADMIN'],
//     default: 'USER'
//   },
//   isTwoFactorEnabled: Boolean,
// });

// let User:any;
// if (mongoose.models?.User) {
//   User = mongoose.model('User');
// } else {
//   User = mongoose.model('User', UserSchema);
// }

// export default User;