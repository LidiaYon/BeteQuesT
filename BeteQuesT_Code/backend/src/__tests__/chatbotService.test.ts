import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';
import { Country } from '../models/Country';
import { processChatbotQuery } from '../services/chatbotService';

let mongoServer: MongoMemoryServer;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  const mongoUri = mongoServer.getUri();
  await mongoose.connect(mongoUri);
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
});

beforeEach(async () => {
  await Country.deleteMany({});
  
  // Seed test data
  await Country.create({
    name: 'TestCountry',
    capital: 'TestCapital',
    population: 1000000,
    languages: ['TestLanguage1', 'TestLanguage2'],
    currency: 'TestCurrency',
    landmarks: [{ 
      name: 'TestLandmark', 
      description: 'A test landmark', 
      location: 'TestLocation' 
    }],
    culturalInfo: {
      greetings: 'TestGreeting',
      customs: 'TestCustoms',
      etiquette: 'TestEtiquette'
    }
  });
});

describe('Chatbot Service', () => {
  it('should answer population query', async () => {
    const response = await processChatbotQuery('What is the population of TestCountry?');
    expect(response).toBe('The population of TestCountry is 1,000,000.');
  });

  it('should answer capital query', async () => {
    const response = await processChatbotQuery('What is the capital of TestCountry?');
    expect(response).toBe('The capital of TestCountry is TestCapital.');
  });

  it('should answer language query', async () => {
    const response = await processChatbotQuery('What languages are spoken in TestCountry?');
    expect(response).toBe('The languages spoken in TestCountry are TestLanguage1, TestLanguage2.');
  });

  it('should answer currency query', async () => {
    const response = await processChatbotQuery('What is the currency of TestCountry?');
    expect(response).toBe('The currency of TestCountry is TestCurrency.');
  });

  it('should answer landmark query', async () => {
    const response = await processChatbotQuery('Tell me about a landmark in TestCountry');
    expect(response).toBe('A famous landmark in TestCountry is TestLandmark. A test landmark It is located in TestLocation.');
  });

  it('should answer culture query', async () => {
    const response = await processChatbotQuery('What can you tell me about the culture of TestCountry?');
    expect(response).toBe(
      "Here's some cultural information about TestCountry:\n" +
      "- Greeting: TestGreeting\n" +
      "- Customs: TestCustoms\n" +
      "- Etiquette: TestEtiquette\n"
    );
  });

  it('should provide general information when no specific query is recognized', async () => {
    const response = await processChatbotQuery('Tell me about TestCountry');
    expect(response).toBe('TestCountry is a country with a population of 1,000,000. Its capital is TestCapital and the official languages are TestLanguage1, TestLanguage2. The currency used is TestCurrency.');
  });

  it('should handle queries about non-existent countries', async () => {
    const response = await processChatbotQuery('What is the capital of Atlantis?');
    expect(response).toBe("I'm sorry, I couldn't find information about atlantis. Could you please check the spelling or try another country?");
  });

  it('should handle FAQ queries', async () => {
    const response = await processChatbotQuery('What information can you provide about countries?');
    expect(response).toContain("I can provide information about a country's population, capital, languages, currency, landmarks, and cultural aspects.");
  });
  
  it('should handle queries with common words', async () => {
    const response = await processChatbotQuery('Tell me about the world');
    expect(response).toBe("I'm sorry, I couldn't understand your question. I can provide information about countries. Could you please ask about a specific country?");
  });

  it('should handle unrecognized queries', async () => {
    const response = await processChatbotQuery('What is the meaning of life?');
    expect(response).toBe("I'm sorry, I couldn't understand your question. I can provide information about countries. Could you please ask about a specific country?");
  });
});