import { Country } from '../models/Country';
import Fuse from 'fuse.js';

interface FAQ {
  question: string;
  answer: string;
}

class Chatbot {
  private fuse: Fuse<FAQ>;
  private faqs: FAQ[];

  constructor() {
    this.faqs = [
      {
        question: "What information can you provide about countries?",
        answer: "I can provide information about a country's population, capital, languages, currency, landmarks, cultural aspects, and more. Just ask about a specific country!"
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

    this.fuse = new Fuse(this.faqs, {
      keys: ['question'],
      threshold: 0.4,
    });
  }

  private async getCountryInfo(countryName: string, specificQuery?: string): Promise<string> {
    const country = await Country.findOne({ name: new RegExp(`^${countryName}$`, 'i') });
    if (!country) {
      return `I'm sorry, I couldn't find information about ${countryName}. Could you please check the spelling or try another country?`;
    }

    if (specificQuery) {
      if (specificQuery.includes('capital')) {
        return `The capital of ${country.name} is ${country.capital}.`;
      }
      if (specificQuery.includes('language') || specificQuery.includes('speak')) {
        return `The official language${country.languages.length > 1 ? 's' : ''} of ${country.name} ${country.languages.length > 1 ? 'are' : 'is'} ${country.languages.join(', ')}.`;
      }
      // Add more specific query handlers here
    }

    return `
      ${country.name} is a country with a population of ${country.population.toLocaleString()}.
      Its capital is ${country.capital}.
      The official language${country.languages.length > 1 ? 's are' : ' is'} ${country.languages.join(', ')}.
      The currency used is ${country.currency}.
      ${country.landmarks && country.landmarks.length > 0 ? `A famous landmark is ${country.landmarks[0].name}.` : ''}
      ${country.culturalInfo ? `Greeting: ${country.culturalInfo.greetings}` : ''}
    `;
  }

  private extractCountryName(query: string): string | null {
    const matches = query.match(/\b(?:about|in|of)\s+(\w+)(?:\s|$)/i);
    return matches ? matches[1] : null;
  }

  
  public async processQuery(query: string): Promise<string> {
    const lowercaseQuery = query.toLowerCase();

    // Check if the query matches any FAQ
    const faqResults = this.fuse.search(query);
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

    // Extract country name and get country info
    const countryName = this.extractCountryName(query);
    if (countryName) {
      return await this.getCountryInfo(countryName, lowercaseQuery);
    }

    // If no specific query is recognized
    return "I'm sorry, I couldn't understand your question. You can ask about specific countries, or ask how to use features like wishlists, visited countries, and comments. How can I assist you?";
  }
   
}

export const chatbot = new Chatbot();