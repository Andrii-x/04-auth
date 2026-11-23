import mongoose from 'mongoose';

export const initMongoConnection = async () => {
  if (!process.env.MONGO_URL) {
    throw new Error('MONGO_URL is not configured');
  }

  const connection = await mongoose.connect(process.env.MONGO_URL);
  console.log(`MongoDB connected: ${connection.connection.host}`);
};