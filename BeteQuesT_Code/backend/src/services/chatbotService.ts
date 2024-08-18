import { Country } from '../models/Country';
import Fuse from 'fuse.js';

interface FAQ {
  question: string;
  answer: string;
}

const faqs: FAQ[] = [
  {
    question: "What information can you provide about countries?",
    answer: "I can provide information about a country's population, capital, languages, currency, landmarks, and cultural aspects. Just ask about a specific country!"
  },
  {
    question: "How do I ask about a specific country?",
    answer: "You can ask questions like 'What is the capital of France?', 'What languages are spoken in Switzerland?', or 'Tell me about the culture of Japan.'"
  },
  {
    question: "How can I add a country to my wishlist?",
    answer: "To add a country to your wishlist, use the 'Add to Wishlist' button on the country's page or use the API endpoint POST /api/users/profile/wishlist with the country ID."
  },
  {
    question: "How can I mark a country as visited?",
    answer: "To mark a country as visited, use the 'Mark as Visited' button on the country's page or use the API endpoint POST /api/users/profile/visited with the country ID."
  },
  {
    question: "Can I add comments about countries?",
    answer: "Yes, you can add comments about countries you've visited or want to visit. Use the 'Add Comment' feature on the country's page or the API endpoint POST /api/users/profile/comments."
  },
  {
    question: "How can I view my wishlist?",
    answer: "You can view your wishlist on your profile page or by using the API endpoint GET /api/users/profile to retrieve your full profile information."
  },
  {
    question: "Can I remove a country from my visited list?",
    answer: "Yes, you can remove a country from your visited list using the API endpoint DELETE /api/users/profile/visited/:countryId."
  }
];

const fuse = new Fuse(faqs, {
  keys: ['question'],
  threshold: 0.4,
});

const commonWords = ['the', 'a', 'an', 'in', 'on', 'at', 'to', 'for', 'of', 'with', 'by', 'from', 'up', 'about', 'into', 'over', 'after', 'life', 'world', 'meaning'];

export const processChatbotQuery = async (query: string): Promise<string> => {
  const lowercaseQuery = query.toLowerCase();

  // Check if the query matches any FAQ
  const faqResults = fuse.search(query);
  if (faqResults.length > 0) {
    return faqResults[0].item.answer;
  }

  // Check for user-related queries
  if (lowercaseQuery.includes('wishlist') || lowercaseQuery.includes('visited')) {
    return "You can manage your wishlist and visited countries on your profile page. Use the 'Add to Wishlist' or 'Mark as Visited' buttons on country pages, or use the appropriate API endpoints.";
  }

  if (lowercaseQuery.includes('comment') || lowercaseQuery.includes('review')) {
    return "You can add comments about countries using the 'Add Comment' feature on the country's page or through the API endpoint POST /api/users/profile/comments.";
  }

  // Extract potential country name from the query
  const countryMatch = lowercaseQuery.match(/(?:about|of|in)\s+(\w+)(?:\?)?$/);
  
  if (!countryMatch || commonWords.includes(countryMatch[1])) {
    return "I'm sorry, I couldn't understand your question. I can provide information about countries or help with user features like wishlists and comments. Could you please clarify your question?";
  }

  const countryName = countryMatch[1];
  const country = await Country.findOne({ name: new RegExp(`^${countryName}$`, 'i') });

  if (!country) {
    return `I'm sorry, I couldn't find information about ${countryName}. Could you please check the spelling or try another country?`;
  }

  if (lowercaseQuery.includes('population')) {
    return `The population of ${country.name} is ${country.population.toLocaleString()}.`;
  }

  if (lowercaseQuery.includes('capital')) {
    return `The capital of ${country.name} is ${country.capital}.`;
  }

  if (lowercaseQuery.includes('language') || lowercaseQuery.includes('speak')) {
    return `The ${country.languages.length > 1 ? 'languages' : 'language'} spoken in ${country.name} ${country.languages.length > 1 ? 'are' : 'is'} ${country.languages.join(', ')}.`;
  }

  if (lowercaseQuery.includes('currency')) {
    return `The currency of ${country.name} is ${country.currency}.`;
  }

  if (lowercaseQuery.includes('landmark') || lowercaseQuery.includes('attraction')) {
    if (country.landmarks && country.landmarks.length > 0) {
      const landmark = country.landmarks[0];
      return `A famous landmark in ${country.name} is ${landmark.name}. ${landmark.description} It is located in ${landmark.location}.`;
    } else {
      return `I'm sorry, I don't have information about specific landmarks in ${country.name}.`;
    }
  }

  if (lowercaseQuery.includes('culture') || lowercaseQuery.includes('custom')) {
    let response = `Here's some cultural information about ${country.name}:\n`;
    if (country.culturalInfo) {
      response += `- Greeting: ${country.culturalInfo.greetings}\n`;
      response += `- Customs: ${country.culturalInfo.customs}\n`;
      response += `- Etiquette: ${country.culturalInfo.etiquette}\n`;
    }
    return response;
  }

  // Default response if no specific information was requested
  return `${country.name} is a country with a population of ${country.population.toLocaleString()}. Its capital is ${country.capital} and the official ${country.languages.length > 1 ? 'languages are' : 'language is'} ${country.languages.join(', ')}. The currency used is ${country.currency}. You can add this country to your wishlist or mark it as visited in your profile.`;
};