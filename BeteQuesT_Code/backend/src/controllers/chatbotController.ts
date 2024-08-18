import { Request, Response } from 'express';
import { chatbot } from '../services/chatbot';

export const processChatbotQuery = async (req: Request, res: Response) => {
  try {
    const { query } = req.body;
    if (!query || typeof query !== 'string') {
      return res.status(400).json({ message: 'Invalid query. Please provide a valid string query.' });
    }
    const response = await chatbot.processQuery(query);
    res.json({ response });
  } catch (error) {
    console.error('Error processing chatbot query:', error);
    res.status(500).json({ message: 'Error processing query', error: (error as Error).message });
  }
};