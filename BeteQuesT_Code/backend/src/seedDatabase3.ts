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

    // Create users and profiles
    const users = [
      { username: 'admin', email: 'admin@example.com', password: 'adminpassword', role: 'admin', fullName: 'Admin User', bio: 'System administrator', interests: ['Technology', 'Management'] },
      { username: 'traveler1', email: 'traveler1@example.com', password: 'password123', role: 'user', fullName: 'Alex Johnson', bio: 'Passionate about exploring new cultures', interests: ['Traveling', 'Photography', 'Cuisine'] },
      { username: 'culturebuff', email: 'culturebuff@example.com', password: 'culturepass', role: 'user', fullName: 'Maria Garcia', bio: 'Anthropology student and culture enthusiast', interests: ['History', 'Languages', 'Art'] },
      { username: 'globetrotter', email: 'globetrotter@example.com', password: 'worldpass', role: 'user', fullName: 'James Lee', bio: 'Digital nomad and travel blogger', interests: ['Adventure', 'Writing', 'Sustainability'] },
      { username: 'foodexplorer', email: 'foodexplorer@example.com', password: 'tastytravel', role: 'user', fullName: 'Sophie Dubois', bio: 'Culinary artist exploring global cuisines', interests: ['Cooking', 'Food History', 'Agriculture'] },
      { username: 'historybuff', email: 'historybuff@example.com', password: 'pastlover', role: 'user', fullName: 'Ahmed Hassan', bio: 'Historian focusing on ancient civilizations', interests: ['Archaeology', 'Mythology', 'Literature'] },
      { username: 'ecowarrior', email: 'ecowarrior@example.com', password: 'greenplanet', role: 'user', fullName: 'Emma Wilson', bio: 'Environmental scientist and sustainable travel advocate', interests: ['Ecology', 'Conservation', 'Renewable Energy'] },
      { username: 'artaficionado', email: 'artaficionado@example.com', password: 'creativesoul', role: 'user', fullName: 'Carlos Mendoza', bio: 'Art curator with a love for global artistic expressions', interests: ['Fine Arts', 'Street Art', 'Cultural Festivals'] },
      { username: 'techonomad', email: 'techonomad@example.com', password: 'digitalworld', role: 'user', fullName: 'Yuki Tanaka', bio: 'Software engineer exploring tech scenes worldwide', interests: ['Technology', 'Innovation', 'Startups'] },
      { username: 'sportsexplorer', email: 'sportsexplorer@example.com', password: 'activeglobal', role: 'user', fullName: 'Olivia Brown', bio: 'Sports journalist covering international events', interests: ['Athletics', 'Traditional Sports', 'Fitness'] }
    ];

    for (const userData of users) {
      const user = new User({
        username: userData.username,
        email: userData.email,
        password: userData.password,
        role: userData.role
      });
      await user.save();

      const profile = new UserProfile({
        user: user._id,
        fullName: userData.fullName,
        bio: userData.bio,
        interests: userData.interests
      });
      await profile.save();
    }

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
          },
          {
            name: 'Grand Canyon',
            description: 'Vast and colorful landscape',
            location: 'Arizona'
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
          },
          {
            name: 'Fushimi Inari Shrine',
            description: 'Famous for its thousands of torii gates',
            location: 'Kyoto'
          }
        ],
        businessCulture: {
          norms: 'Group harmony is highly valued',
          etiquette: 'Exchange of business cards (meishi) is an important ritual'
        },
        imageUrl: 'https://example.com/japan-flag.jpg'
      },
      {
        name: 'France',
        capital: 'Paris',
        population: 67391582,
        languages: ['French'],
        currency: 'Euro',
        culturalInfo: {
          greetings: 'Bonjour',
          customs: 'Cheek kissing (la bise) is common among friends',
          etiquette: 'Table manners are important; keep hands visible during meals',
          religion: {
            mainReligions: ['Christianity', 'Islam', 'Judaism'],
            practices: 'Secularism (laïcité) is an important principle in public life'
          },
          family: {
            dynamics: 'Family is important, with extended family gatherings common',
            genderRoles: 'Equality is promoted, with both parents often working',
            marriageCustoms: 'Civil marriages are required; religious ceremonies are optional'
          },
          naming: {
            conventions: 'First name followed by family name',
            addressingOthers: 'Use Monsieur, Madame, or Mademoiselle in formal settings'
          },
          datesOfSignificance: {
            national: ['July 14th - Bastille Day', 'May 1st - Labour Day'],
            religious: ['December 25th - Christmas', 'Varies - Easter']
          },
          communication: {
            verbalPatterns: 'Directness is appreciated, but with politeness',
            nonVerbalCustoms: 'Maintaining eye contact is important'
          }
        },
        landmarks: [
          { 
            name: 'Eiffel Tower', 
            description: 'Iconic iron lattice tower',
            location: 'Paris'
          },
          {
            name: 'Palace of Versailles',
            description: 'Opulent royal château',
            location: 'Versailles'
          }
        ],
        businessCulture: {
          norms: 'Formal business attire is expected',
          etiquette: 'Business lunches are common and can be lengthy'
        },
        imageUrl: 'https://example.com/france-flag.jpg'
      },
      {
        name: 'Brazil',
        capital: 'Brasília',
        population: 212559417,
        languages: ['Portuguese'],
        currency: 'Brazilian Real',
        culturalInfo: {
          greetings: 'Olá',
          customs: 'Hugging and kissing cheeks are common greetings among friends',
          etiquette: 'Being late to social gatherings is often acceptable',
          religion: {
            mainReligions: ['Christianity', 'Spiritism', 'Afro-Brazilian religions'],
            practices: 'Religious syncretism is common'
          },
          family: {
            dynamics: 'Extended families are important',
            genderRoles: 'Traditional roles exist but are changing in urban areas',
            marriageCustoms: 'Both civil and religious marriages are recognized'
          },
          naming: {
            conventions: 'First name followed by mother\'s and father\'s family names',
            addressingOthers: 'First names are commonly used, even in professional settings'
          },
          datesOfSignificance: {
            national: ['September 7th - Independence Day', 'February/March - Carnival'],
            religious: ['December 25th - Christmas', 'Varies - Easter']
          },
          communication: {
            verbalPatterns: 'Animated and expressive speech is common',
            nonVerbalCustoms: 'Physical proximity and touch during conversation are normal'
          }
        },
        landmarks: [
          { 
            name: 'Christ the Redeemer', 
            description: 'Art Deco statue of Jesus Christ',
            location: 'Rio de Janeiro'
          },
          {
            name: 'Amazon Rainforest',
            description: 'Largest tropical rainforest in the world',
            location: 'North Brazil'
          }
        ],
        businessCulture: {
          norms: 'Building personal relationships is important in business',
          etiquette: 'Business attire is formal in major cities'
        },
        imageUrl: 'https://example.com/brazil-flag.jpg'
      },
      {
        name: 'India',
        capital: 'New Delhi',
        population: 1380004385,
        languages: ['Hindi', 'English', 'and 21 other officially recognized languages'],
        currency: 'Indian Rupee',
        culturalInfo: {
          greetings: 'Namaste',
          customs: 'Removing shoes before entering homes or temples',
          etiquette: 'Eating with the right hand is customary',
          religion: {
            mainReligions: ['Hinduism', 'Islam', 'Christianity', 'Sikhism'],
            practices: 'Religious practices vary widely across different faiths'
          },
          family: {
            dynamics: 'Joint families are common, especially in rural areas',
            genderRoles: 'Traditional roles are changing, especially in urban areas',
            marriageCustoms: 'Arranged marriages are still common alongside love marriages'
          },
          naming: {
            conventions: 'Vary by region and religion',
            addressingOthers: 'Use of honorifics like Ji after names is common'
          },
          datesOfSignificance: {
            national: ['August 15th - Independence Day', 'January 26th - Republic Day'],
            religious: ['Varies - Diwali', 'Varies - Eid al-Fitr']
          },
          communication: {
            verbalPatterns: 'Indirect communication is often preferred',
            nonVerbalCustoms: 'Head wobble can mean yes, no, or maybe'
          }
        },
        landmarks: [
          { 
            name: 'Taj Mahal', 
            description: 'Iconic ivory-white marble mausoleum',
            location: 'Agra'
          },
          {
            name: 'Golden Temple',
            description: 'Holiest Gurdwara of Sikhism',
            location: 'Amritsar'
          }
        ],
        businessCulture: {
          norms: 'Hierarchical structure is common in businesses',
          etiquette: 'Business cards should be exchanged with the right hand'
        },
        imageUrl: 'https://example.com/india-flag.jpg'
      },
      {
        name: 'Eritrea',
        capital: 'Asmara',
        population: 3546000,
        languages: ['Tigrinya', 'Tigre', 'Afar', 'Arabic', 'Saho'],
        currency: 'Nakfa (ERN)',
        culturalInfo: {
          greetings: 'Selam',
          customs: 'Shaking hands followed by touching the right shoulder, or a slight bow with hands crossed over the chest.',
          etiquette: 'Meals are shared from a communal platter using injera; washing hands before eating is essential.',
          religion: {
            mainReligions: ['Christianity (Orthodox, Catholic, Protestant)', 'Islam'],
            practices: 'Both Christian and Islamic holidays are widely observed, with church services and mosque prayers.'
          },
          family: {
            dynamics: 'Strong emphasis on family loyalty and respect for elders.',
            genderRoles: 'Traditional roles are prevalent, though slowly evolving, especially in urban areas.',
            marriageCustoms: 'Marriages often involve large, community-focused ceremonies, with both arranged and love marriages being common.'
          },
          naming: {
            conventions: 'Given name followed by the father\'s name and sometimes the grandfather\'s name.',
            addressingOthers: 'Respectful terms like "Aboy" for fathers, "Adey" for mothers, and "Haftey" for sisters are commonly used.'
          },
          datesOfSignificance: {
            national: ['May 24th - Independence Day', 'September 1st - Start of the Armed Struggle Day'],
            religious: ['January 7th - Orthodox Christmas', 'April 23rd - Orthodox Easter']
          },
          communication: {
            verbalPatterns: 'Direct communication is common, but politeness is highly valued.',
            nonVerbalCustoms: 'Respectful greetings often involve physical gestures like handshakes or bows.'
          }
        },
        landmarks: [
          {
            name: 'Asmara',
            description: 'Known for its well-preserved colonial Italian modernist architecture.',
            location: 'Central Eritrea'
          },
          {
            name: 'Dahlak Archipelago',
            description: 'A group of islands known for their marine biodiversity and historical significance.',
            location: 'Red Sea'
          }
        ],
        businessCulture: {
          norms: 'Building personal relationships is key to business success.',
          etiquette: 'Punctuality is appreciated, but meetings often start with casual conversation.'
        },
        imageUrl: 'https://example.com/eritrea-flag.jpg'
      },
      {
        name: 'Ethiopia',
        capital: 'Addis Ababa',
        population: 115000000,
        languages: ['Amharic', 'Oromo', 'Tigrinya', 'Somali', 'Afar'],
        currency: 'Birr (ETB)',
        culturalInfo: {
          greetings: 'Selam, Tena yistilign',
          customs: 'A handshake with direct eye contact, followed by kisses on the cheeks or bowing while shaking hands, depending on the region.',
          etiquette: 'Food is shared from a communal plate with injera; meals are traditionally eaten with the right hand.',
          religion: {
            mainReligions: ['Christianity (Orthodox, Protestant)', 'Islam'],
            practices: 'Religious festivals like Timkat and Fasika are celebrated with large gatherings and elaborate ceremonies.'
          },
          family: {
            dynamics: 'Family ties are very strong, with respect for elders being paramount.',
            genderRoles: 'Traditional roles are still prevalent, but change is occurring, especially in urban areas.',
            marriageCustoms: 'Marriage often involves large, elaborate ceremonies; both arranged and love marriages are common.'
          },
          naming: {
            conventions: 'Given name followed by the father\'s name and sometimes the grandfather\'s name.',
            addressingOthers: 'Titles like "Ato" (Mr.), "Woizero" (Mrs.), and "Woizrity" (Miss) are commonly used.'
          },
          datesOfSignificance: {
            national: ['May 28th - Derg Downfall Day', 'September 11th - Enkutatash (New Year)'],
            religious: ['January 19th - Timkat (Epiphany)', 'April 28th - Fasika (Easter)']
          },
          communication: {
            verbalPatterns: 'Respectful and polite communication is valued; direct eye contact is common.',
            nonVerbalCustoms: 'Handshakes are often combined with shoulder touches or kisses on the cheeks.'
          }
        },
        landmarks: [
          {
            name: 'Lalibela',
            description: 'Famous for its rock-hewn churches, a UNESCO World Heritage site.',
            location: 'Northern Ethiopia'
          },
          {
            name: 'Simien Mountains',
            description: 'Known for breathtaking landscapes and unique wildlife, including the Gelada baboons.',
            location: 'Northern Ethiopia'
          }
        ],
        businessCulture: {
          norms: 'Personal relationships are important; trust is built through repeated interactions.',
          etiquette: 'Business meetings often start with social conversation before getting down to business.'
        },
        imageUrl: 'https://example.com/ethiopia-flag.jpg'
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