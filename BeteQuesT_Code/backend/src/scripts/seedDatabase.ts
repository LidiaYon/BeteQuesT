import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from '../models/User';
import Country from '../models/Country';

dotenv.config();

const seedDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI as string);
    console.log('Connected to MongoDB');

    // Clear existing data
    await User.deleteMany({});
    await Country.deleteMany({});

    // Create users
    const adminUser = new User({
      username: 'admin',
      email: 'admin@example.com',
      password: 'adminpassword',
      role: 'admin'
    });
    await adminUser.save();

    const normalUser = new User({
      username: 'user',
      email: 'user@example.com',
      password: 'userpassword',
      role: 'user'
    });
    await normalUser.save();

    // Create countries
    const countries = [
      {
        name: 'United States',
        capital: 'Washington, D.C.',
        population: 331002651,
        languages: ['English'],
        currency: 'US Dollar',
        culturalInfo: {
          greetings: 'Hello',
          customs: 'Tipping is customary in restaurants',
          etiquette: 'Maintain eye contact during conversations'
        },
        marketingTips: ['Emphasize individuality and personal freedom'],
        travelAdvice: ['Distances between cities can be vast, plan accordingly'],
        imageUrl: 'https://example.com/us-flag.jpg'
      },
      {
        name: 'Japan',
        capital: 'Tokyo',
        population: 126476461,
        languages: ['Japanese'],
        currency: 'Japanese Yen',
        culturalInfo: {
          greetings: 'Konnichiwa',
          customs: 'Bow when greeting',
          etiquette: 'Remove shoes before entering homes'
        },
        marketingTips: ['Focus on group harmony and consensus'],
        travelAdvice: ['Public transportation is efficient and punctual'],
        imageUrl: 'https://example.com/japan-flag.jpg'
      }
    ];

    await Country.insertMany(countries);

    console.log('Database seeded successfully');
    mongoose.connection.close();
  } catch (error) {
    console.error('Error seeding database:', error);
    mongoose.connection.close();
  }
};

seedDatabase();