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
            addressingOthers: 'Use of honorifics like 'Ji' after names is common'
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
        name: 'Australia',
        capital: 'Canberra',
        population: 25687041,
        languages: ['English'],
        currency: 'Australian Dollar',
        culturalInfo: {
          greetings: 'G\'day',
          customs: 'Barbecues (barbies) are a popular social gathering',
          etiquette: 'Casual approach to most social interactions',
          religion: {
            mainReligions: ['Christianity', 'Islam', 'Buddhism'],
            practices: 'Secular society with freedom of religion'
          },
          family: {
            dynamics: 'Nuclear families are common',
            genderRoles: 'Equality is emphasized',
            marriageCustoms: 'Both traditional and same-sex marriages are legally recognized'
          },
          naming: {
            conventions: 'First name followed by family name',
            addressingOthers: 'First names are commonly used in most situations'
          },
          datesOfSignificance: {
            national: ['January 26th - Australia Day', 'April 25th - Anzac Day'],
            religious: ['December 25th - Christmas', 'Varies - Easter']
          },
          communication: {
            verbalPatterns: 'Direct communication with a casual tone',
            nonVerbalCustoms: 'Firm handshake is a common greeting'
          },
        },
        landmarks: [
          { 
            name: 'Sydney Opera House', 
            description: 'Iconic performing arts venue',
            location: 'Sydney'
          },
          {
            name: 'Great Barrier Reef',
            description: 'World's largest coral reef system',
            location: 'Off the coast of Queensland'
          }
        ],
        businessCulture: {
          norms: 'Egalitarian approach to business relationships',
          etiquette: 'Punctuality is appreciated but not strictly adhered to'
        },
        imageUrl: 'https://example.com/australia-flag.jpg'
      },
      {
        name: 'Egypt',
        capital: 'Cairo',
        population: 102334404,
        languages: ['Arabic'],
        currency: 'Egyptian Pound',
        culturalInfo: {
          greetings: 'As-salaam-alaikum',
          customs: 'Hospitality is highly valued',
          etiquette: 'Use right hand for eating and handling objects',
          religion: {
            mainReligions: ['Islam', 'Coptic Christianity'],
            practices: 'Religion plays a significant role in daily life'
          },
          family: {
            dynamics: 'Extended families are important',
            genderRoles: 'Traditional roles exist but are evolving',
            marriageCustoms: 'Arranged marriages are common but declining in urban areas'
          },
          naming: {
            conventions: 'Personal name followed by father's and grandfather's names',
            addressingOthers: 'Use of honorifics like 'Ustaz' (Mr.) or 'Ustaza' (Ms.)'
          },
          datesOfSignificance: {
            national: ['July 23rd - Revolution Day', 'October 6th - Armed Forces Day'],
            religious: ['Varies - Eid al-Fitr', 'Varies - Coptic Christmas']
          },
          communication: {
            verbalPatterns: 'Indirect communication is common',
            nonVerbalCustoms: 'Close physical proximity in conversation is normal'
          }
        },
        landmarks: [
          { 
            name: 'Great Pyramids of Giza', 
            description: 'Ancient wonder of the world',
            location: 'Giza'
          },
          {
            name: 'Luxor Temple',
            description: 'Ancient Egyptian temple complex',
            location: 'Luxor'
          }
        ],
        businessCulture: {
          norms: 'Building personal relationships is crucial in business',
          etiquette: 'Conservative dress is expected in business settings'
        },
        imageUrl: 'https://example.com/egypt-flag.jpg'
      },
      {
        name: 'Germany',
        capital: 'Berlin',
        population: 83783942,
        languages: ['German'],
        currency: 'Euro',
        culturalInfo: {
          greetings: 'Guten Tag',
          customs: 'Punctuality is highly valued',
          etiquette: 'Direct communication is appreciated',
          religion: {
            mainReligions: ['Christianity', 'Islam'],
            practices: 'Secular society with freedom of religion'
          },
          family: {
            dynamics: 'Nuclear families are common',
            genderRoles: 'Gender equality is promoted',
            marriageCustoms: 'Civil marriages are required; religious ceremonies are optional'
          },
          naming: {
            conventions: 'First name followed by family name',
            addressingOthers: 'Use of formal 'Sie' until invited to use informal 'du''
          },
          datesOfSignificance: {
            national: ['October 3rd - German Unity Day', 'May 1st - Labor Day'],
            religious: ['December 25th - Christmas', 'Varies - Easter']
          },
          communication: {
            verbalPatterns: 'Direct and straightforward communication',
            nonVerbalCustoms: 'Firm handshake is common in greetings'
          }
        },
        landmarks: [
          { 
            name: 'Brandenburg Gate', 
            description: 'Iconic 18th-century neoclassical monument',
            location: 'Berlin'
          },
          {
            name: 'Neuschwanstein Castle',
            description: 'Romantic 19th-century palace',
            location: 'Bavaria'
          }
        ],
        businessCulture: {
          norms: 'Hierarchical structure in businesses',
          etiquette: 'Formal business attire is expected'
        },
        imageUrl: 'https://example.com/germany-flag.jpg'
      },
      {
        name: 'Mexico',
        capital: 'Mexico City',
        population: 128932753,
        languages: ['Spanish'],
        currency: 'Mexican Peso',
        culturalInfo: {
          greetings: 'Hola',
          customs: 'Family-oriented culture',
          etiquette: 'Respect for elders is important',
          religion: {
            mainReligions: ['Roman Catholicism', 'Protestantism'],
            practices: 'Religious festivals are important cultural events'
          },
          family: {
            dynamics: 'Extended families are highly valued',
            genderRoles: 'Traditional roles exist but are changing',
            marriageCustoms: 'Both civil and religious marriages are common'
          },
          naming: {
            conventions: 'First name followed by father's and mother's family names',
            addressingOthers: 'Use of honorifics like 'Señor' or 'Señora''
          },
          datesOfSignificance: {
            national: ['September 16th - Independence Day', 'November 20th - Revolution Day'],
            religious: ['December 12th - Day of Our Lady of Guadalupe', 'Varies - Easter']
          },
          communication: {
            verbalPatterns: 'Indirect communication is often preferred',
            nonVerbalCustoms: 'Physical contact like hugs or handshakes in greetings'
        },
        landmarks: [
          { 
            name: 'Chichen Itza', 
            description: 'Ancient Maya city',
            location: 'Yucatan Peninsula'
          },
          {
            name: 'Frida Kahlo Museum',
            description: 'Museum dedicated to the famous artist',
            location: 'Mexico City'
          }
        ],
        businessCulture: {
          norms: 'Building personal relationships is important in business',
          etiquette: 'Punctuality is appreciated but not always strictly followed'
        },
        imageUrl: 'https://example.com/mexico-flag.jpg'
      },
      {
        name: 'South Africa',
        capital: 'Pretoria (administrative), Cape Town (legislative), Bloemfontein (judicial)',
        population: 59308690,
        languages: ['11 official languages including English, Zulu, Xhosa, Afrikaans'],
        currency: 'South African Rand',
        culturalInfo: {
          greetings: 'Hello (English), Sawubona (Zulu)',
          customs: 'Ubuntu philosophy of community and humanity',
          etiquette: 'Respect for elders is important',
          religion: {
            mainReligions: ['Christianity', 'Indigenous beliefs', 'Islam', 'Hinduism'],
            practices: 'Freedom of religion is constitutionally protected'
          },
          family: {
            dynamics: 'Extended families are common',
            genderRoles: 'Varied across different cultures',
            marriageCustoms: 'Both traditional and civil marriages are recognized'
          },
          naming: {
            conventions: 'Vary among different cultural groups',
            addressingOthers: 'Use of titles like 'Mr', 'Mrs', or 'Ms' in formal settings'
          },
          datesOfSignificance: {
            national: ['April 27th - Freedom Day', 'September 24th - Heritage Day'],
            religious: ['Varies - Easter', 'Varies - Eid al-Fitr']
          },
          communication: {
            verbalPatterns: 'Direct communication, but with respect for harmony',
            nonVerbalCustoms: 'Eye contact is important but may be avoided out of respect'
          }
        },
        landmarks: [
          { 
            name: 'Table Mountain', 
            description: 'Flat-topped mountain overlooking Cape Town',
            location: 'Cape Town'
          },
          {
            name: 'Kruger National Park',
            description: 'One of Africa's largest game reserves',
            location: 'Northeastern South Africa'
          }
        ],
        businessCulture: {
          norms: 'Punctuality is valued in business settings',
          etiquette: 'Business cards are exchanged with the right hand or both hands'
        },
        imageUrl: 'https://example.com/south-africa-flag.jpg'
      },
      {
        name: 'Italy',
        capital: 'Rome',
        population: 60461826,
        languages: ['Italian'],
        currency: 'Euro',
        culturalInfo: {
          greetings: 'Ciao (informal), Buongiorno (formal)',
          customs: 'Family-centric culture, emphasis on food and wine',
          etiquette: 'Hand gestures are an important part of communication',
          religion: {
            mainReligions: ['Roman Catholicism'],
            practices: 'Religious traditions influence cultural life'
          },
          family: {
            dynamics: 'Strong family ties, multi-generational households common',
            genderRoles: 'Traditional roles exist but are evolving',
            marriageCustoms: 'Both civil and religious marriages are recognized'
          },
          naming: {
            conventions: 'First name followed by family name',
            addressingOthers: 'Use of formal 'Lei' until invited to use informal 'tu''
          },
          datesOfSignificance: {
            national: ['June 2nd - Republic Day', 'April 25th - Liberation Day'],
            religious: ['December 25th - Christmas', 'Varies - Easter']
          },
          communication: {
            verbalPatterns: 'Expressive and animated speech',
            nonVerbalCustoms: 'Cheek kissing as a greeting among friends'
          }
        },
        landmarks: [
          { 
            name: 'Colosseum', 
            description: 'Ancient amphitheater in the city center',
            location: 'Rome'
          },
          {
            name: 'Venice Canals',
            description: 'Network of canals in the historic city',
            location: 'Venice'
          }
        ],
        businessCulture: {
          norms: 'Personal relationships are important in business',
          etiquette: 'Elegant and fashionable business attire is expected'
        },
        imageUrl: 'https://example.com/italy-flag.jpg'
      },
      {
        name: 'China',
        capital: 'Beijing',
        population: 1439323776,
        languages: ['Mandarin Chinese'],
        currency: 'Renminbi (Yuan)',
        culturalInfo: {
          greetings: 'Nǐ hǎo',
          customs: 'Respect for hierarchy and elders',
          etiquette: 'Avoiding loss of face is important',
          religion: {
            mainReligions: ['Buddhism', 'Taoism', 'Folk religions'],
            practices: 'Religious practices are regulated by the state'
          },
          family: {
            dynamics: 'Filial piety is highly valued',
            genderRoles: 'Traditional roles exist but are changing in urban areas',
            marriageCustoms: 'Marriage is seen as a duty to family and society'
          },
          naming: {
            conventions: 'Family name followed by given name',
            addressingOthers: 'Use of titles and family names in formal settings'
          },
          datesOfSignificance: {
            national: ['October 1st - National Day', 'Varies - Spring Festival (Chinese New Year)'],
            religious: ['Varies - Qingming Festival', 'Varies - Mid-Autumn Festival']
          },
          communication: {
            verbalPatterns: 'Indirect communication is often preferred',
            nonVerbalCustoms: 'Bowing or nodding as a sign of respect'
          }
        },
        landmarks: [
          { 
            name: 'Great Wall of China', 
            description: 'Ancient defensive wall spanning thousands of miles',
            location: 'Northern China'
          },
          {
            name: 'Forbidden City',
            description: 'Imperial palace complex',
            location: 'Beijing'
          }
        ],
        businessCulture: {
          norms: 'Guanxi (personal connections) is important in business',
          etiquette: 'Business cards are exchanged with both hands'
        },
        imageUrl: 'https://example.com/china-flag.jpg'
      },
      {
        name: 'Canada',
        capital: 'Ottawa',
        population: 37742154,
        languages: ['English', 'French'],
        currency: 'Canadian Dollar',
        culturalInfo: {
          greetings: 'Hello, Bonjour',
          customs: 'Politeness and inclusivity are highly valued',
          etiquette: 'Apologizing is common, even for minor inconveniences',
          religion: {
            mainReligions: ['Christianity', 'Islam', 'Hinduism', 'Sikhism'],
            practices: 'Secular society with freedom of religion'
          },
          family: {
            dynamics: 'Nuclear families are common',
            genderRoles: 'Gender equality is promoted',
            marriageCustoms: 'Both traditional and same-sex marriages are legally recognized'
          },
          naming: {
            conventions: 'First name followed by family name',
            addressingOthers: 'First names are commonly used in most situations'
          },
          datesOfSignificance: {
            national: ['July 1st - Canada Day', 'November 11th - Remembrance Day'],
            religious: ['December 25th - Christmas', 'Varies - Easter']
          },
          communication: {
            verbalPatterns: 'Direct but polite communication',
            nonVerbalCustoms: 'Firm handshake is a common greeting'
          }
        },
        landmarks: [
          { 
            name: 'CN Tower', 
            description: 'Communications and observation tower',
            location: 'Toronto'
          },
          {
            name: 'Banff National Park',
            description: 'Scenic mountain landscapes and glacial lakes',
            location: 'Alberta'
          }
        ],
        businessCulture: {
          norms: 'Punctuality and preparation are valued',
          etiquette: 'Business casual dress is common in many industries'
        },
        imageUrl: 'https://example.com/canada-flag.jpg'
      },
      {
        name: 'Russia',
        capital: 'Moscow',
        population: 145934462,
        languages: ['Russian'],
        currency: 'Russian Ruble',
        culturalInfo: {
          greetings: 'Zdravstvuyte (formal), Privet (informal)',
          customs: 'Hospitality is highly valued',
          etiquette: 'Removing shoes when entering homes',
          religion: {
            mainReligions: ['Russian Orthodox Christianity', 'Islam'],
            practices: 'Religious practices have seen a resurgence since Soviet times'
          },
          family: {
            dynamics: 'Extended families are important',
            genderRoles: 'Traditional roles exist but are changing',
            marriageCustoms: 'Both civil and religious marriages are common'
          },
          
          naming: {
            conventions: 'First name, patronymic, family name',
            addressingOthers: 'Use of first name and patronymic in formal settings'
          },
          datesOfSignificance: {
            national: ['June 12th - Russia Day', 'May 9th - Victory Day'],
            religious: ['January 7th - Russian Orthodox Christmas', 'Varies - Easter']
          },
          communication: {
            verbalPatterns: 'Direct communication is valued',
            nonVerbalCustoms: 'Firm handshake, but smiling at strangers is uncommon'
          }
        },
        landmarks: [
          { 
            name: 'Red Square', 
            description: 'City square in Moscow',
            location: 'Moscow'
          },
          {
            name: 'Hermitage Museum',
            description: 'World-renowned art museum',
            location: 'Saint Petersburg'
          }
        ],
        businessCulture: {
          norms: 'Hierarchical structure in businesses',
          etiquette: 'Formal business attire is expected'
        },
        imageUrl: 'https://example.com/russia-flag.jpg'
      },
      {
        name: 'Morocco',
        capital: 'Rabat',
        population: 36910560,
        languages: ['Arabic', 'Berber'],
        currency: 'Moroccan Dirham',
        culturalInfo: {
          greetings: 'As-salaam-alaikum',
          customs: 'Hospitality is a cornerstone of Moroccan culture',
          etiquette: 'Use right hand for eating and handling objects',
          religion: {
            mainReligions: ['Islam'],
            practices: 'Islamic traditions play a significant role in daily life'
          },
          family: {
            dynamics: 'Extended families are important',
            genderRoles: 'Traditional roles exist but are evolving, especially in urban areas',
            marriageCustoms: 'Both religious and civil marriages are recognized'
          },
          naming: {
            conventions: 'First name followed by family name',
            addressingOthers: 'Use of honorifics like 'Si' (Mr.) or 'Lalla' (Mrs.)'
          },
          datesOfSignificance: {
            national: ['July 30th - Throne Day', 'November 18th - Independence Day'],
            religious: ['Varies - Eid al-Fitr', 'Varies - Eid al-Adha']
          },
          communication: {
            verbalPatterns: 'Indirect communication is often preferred',
            nonVerbalCustoms: 'Greetings are important and can be lengthy'
          }
        },
        landmarks: [
          { 
            name: 'Hassan II Mosque', 
            description: 'Largest mosque in Africa',
            location: 'Casablanca'
          },
          {
            name: 'Medina of Fez',
            description: 'Ancient walled city, UNESCO World Heritage site',
            location: 'Fez'
          }
        ],
        businessCulture: {
          norms: 'Building relationships is crucial in business',
          etiquette: 'Conservative dress is expected in business settings'
        },
        imageUrl: 'https://example.com/morocco-flag.jpg'
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
