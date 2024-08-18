import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { User } from './models/User';
import { Country } from './models/Country';
import { UserProfile } from './models/UserProfile';

dotenv.config();

const seedDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI as string);
    console.log('Connected to MongoDB');
    // Clear existing data
    await User.deleteMany({});
    await Country.deleteMany({});
    await UserProfile.deleteMany({});

    // Create users
    const adminUser = new User({
      username: 'admin',
      email: 'admin@example.com',
      password: 'adminpassword',
      role: 'admin'
    });
    await adminUser.save();

    const regularUser = new User({
      username: 'user',
      email: 'user@example.com',
      password: 'userpassword',
      role: 'user'
    });
    await regularUser.save();

    // Create user profiles
    const adminProfile = new UserProfile({
      user: adminUser._id,
      fullName: 'Admin User',
      bio: 'I am the admin',
      interests: ['Managing', 'Traveling']
    });
    await adminProfile.save();

    const userProfile = new UserProfile({
      user: regularUser._id,
      fullName: 'Regular User',
      bio: 'I love exploring new cultures',
      interests: ['Traveling', 'Photography']
    });
    await userProfile.save();

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
          etiquette: 'Maintain eye contact during conversations',
          religion: {
            mainReligions: ['Christianity', 'Judaism', 'Islam'],
            practices: 'Freedom of religion is a fundamental right'
          },
          family: {
            dynamics: 'Nuclear families are common',
            genderRoles: 'Equality is promoted, but disparities exist',
            marriageCustoms: 'Marriages are legally recognized between any two adults'
          },
          naming: {
            conventions: 'Typically first name followed by last name',
            addressingOthers: 'First names are commonly used in informal settings'
          },
          datesOfSignificance: {
            national: ['July 4th - Independence Day', 'November 11th - Veterans Day'],
            religious: ['December 25th - Christmas', 'Varies - Easter']
          },
          communication: {
            verbalPatterns: 'Direct communication is valued',
            nonVerbalCustoms: 'Handshakes are common greetings'
          }
        },
        landmarks: [
          { 
            name: 'Statue of Liberty', 
            description: 'Iconic symbol of freedom',
            location: 'New York Harbor'
          }
        ],
        businessCulture: {
          norms: 'Punctuality is important',
          etiquette: 'Business casual dress is common in many industries'
        },
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
          customs: 'Bowing is a sign of respect',
          etiquette: 'Remove shoes before entering homes',
          religion: {
            mainReligions: ['Shintoism', 'Buddhism'],
            practices: 'Many people practice elements of both Shintoism and Buddhism'
          },
          family: {
            dynamics: 'Respect for elders is crucial',
            genderRoles: 'Traditional roles are changing in modern society',
            marriageCustoms: 'Traditional arranged marriages (omiai) still exist alongside love marriages'
          },
          naming: {
            conventions: 'Family name followed by given name',
            addressingOthers: 'Use of honorifics (san, sama) is common'
          },
          datesOfSignificance: {
            national: ['May 5th - Children\'s Day', 'November 3rd - Culture Day'],
            religious: ['January 1st - Shōgatsu (New Year)', 'Varies - Obon Festival']
          },
          communication: {
            verbalPatterns: 'Indirect communication is often preferred',
            nonVerbalCustoms: 'Avoiding direct eye contact can be a sign of respect'
          }
        },
        landmarks: [
          { 
            name: 'Mount Fuji', 
            description: 'Iconic mountain and cultural symbol',
            location: 'Honshu Island'
          }
        ],
        businessCulture: {
          norms: 'Group harmony is highly valued',
          etiquette: 'Exchange of business cards (meishi) is an important ritual'
        },
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