import mongoose from 'mongoose';

const connectDB = async (): Promise<void> => {
  const uri: string = process.env.MONGODB_URI as string;
  if (!uri) {
    throw new Error("Please define the MONGODB_URI environment variable");
  }

  try {
    await mongoose.connect(uri);
    console.log("Connected to MongoDB.");
  } catch (error) {
    console.error('Error connecting to MongoDB:', (error as Error).message);
  }

  mongoose.connection.on('connected', () => {
    console.log('Mongoose connected to db');
  });

  mongoose.connection.on('error', err => {
    console.log('Mongoose connection error:', err.message);
  });

  mongoose.connection.on('disconnected', () => {
    console.log('Mongoose disconnected');
  });
};

export default connectDB;