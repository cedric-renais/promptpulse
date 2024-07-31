import mongoose from 'mongoose';

let isConnected = false; // Suivre la connexion

export const connectToDB = async () => {
  mongoose.set('strictQuery', true);

  if (isConnected) {
    console.log('MongoDB est déjà connecté');
    return;
  }

  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      dbName: 'promptpulse',
    });

    isConnected = true;

    console.log('MongoDB connecté');
  } catch (error) {
    console.log(error);
  }
};
