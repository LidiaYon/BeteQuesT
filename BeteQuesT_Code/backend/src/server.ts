import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import countryRoutes from './routes/countryRoutes';
import userRoutes from './routes/userRoutes';
import { processChatbotQuery } from './controllers/chatbotController';
import { authenticateToken } from './middleware/auth';
import { IUser } from './models/User';

dotenv.config();

mongoose.set('strictQuery', false);

export const createServer = () => {
  const app = express();

  app.use(cors());
  app.use(express.json());

  app.use('/api/countries', countryRoutes);
  app.use('/api/users', userRoutes);

  // Add chatbot route
  app.post('/api/chatbot', processChatbotQuery);

  app.get('/api/protected', authenticateToken, (req, res) => {
    const userReq = req as express.Request & { user?: IUser };
    res.json({ message: 'This is a protected route', user: userReq.user });
  });

  return app;
};

export const connectToDatabase = async (): Promise<void> => {
  try {
    await mongoose.connect(process.env.MONGODB_URI as string);
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  }
};

if (require.main === module) {
  const app = createServer();
  const PORT = process.env.PORT || 5001;

  connectToDatabase().then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  });
}