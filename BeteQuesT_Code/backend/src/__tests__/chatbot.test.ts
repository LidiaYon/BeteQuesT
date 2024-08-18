import { chatbot } from '../services/chatbot';
import { Country } from '../models/Country';

// Mock the Country model
jest.mock('../models/Country', () => ({
    Country: {
      findOne: jest.fn().mockImplementation((query) => {
        if (query.name.$regex.source === '^TestCountry$') {
          return Promise.resolve({
            name: 'TestCountry',
            population: 1000000,
            capital: 'TestCapital',
            languages: ['Language1', 'Language2'],
            currency: 'TestCurrency',
          });
        }
        return Promise.resolve(null);
      }),
    },
  }));

describe('Chatbot Service', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should answer FAQ questions', async () => {
    const response = await chatbot.processQuery('What information can you provide about countries?');
    expect(response).toContain("I can provide information about a country's population, capital, languages, currency, landmarks, cultural aspects, and more.");
  });

  it('should handle country-specific queries', async () => {
    (Country.findOne as jest.Mock).mockResolvedValue({
      name: 'TestCountry',
      population: 1000000,
      capital: 'TestCapital',
      languages: ['TestLanguage'],
      currency: 'TestCurrency',
    });

    const response = await chatbot.processQuery('Tell me about TestCountry');
    expect(response).toContain('TestCountry is a country with a population of 1,000,000');
    expect(response).toContain('Its capital is TestCapital');
  });

  it('should handle queries about non-existent countries', async () => {
    (Country.findOne as jest.Mock).mockResolvedValue(null);

    const response = await chatbot.processQuery('Tell me about NonExistentCountry');
    expect(response).toContain("I'm sorry, I couldn't find information about NonExistentCountry");
  });

  it('should handle queries about user features', async () => {
    const response = await chatbot.processQuery('How do I add a country to my wishlist?');
    expect(response).toContain('Add to Wishlist');
  });

  it('should provide a default response for unrecognized queries', async () => {
    const response = await chatbot.processQuery('What is the meaning of life?');
    expect(response).toContain("I'm sorry, I couldn't understand your question");
  });

  it('should handle queries about country capitals', async () => {
    (Country.findOne as jest.Mock).mockResolvedValue({
      name: 'TestCountry',
      capital: 'TestCapital',
    });

    const response = await chatbot.processQuery('What is the capital of TestCountry?');
    expect(response).toContain('The capital of TestCountry is TestCapital');
  });

  it('should handle queries about country languages', async () => {
    (Country.findOne as jest.Mock).mockResolvedValue({
      name: 'TestCountry',
      languages: ['Language1', 'Language2'],
    });

    const response = await chatbot.processQuery('What languages are spoken in TestCountry?');
    expect(response).toContain('The official languages are Language1, Language2');
  });
});