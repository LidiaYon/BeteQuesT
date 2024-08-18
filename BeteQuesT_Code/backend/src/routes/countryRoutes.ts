import express from 'express';
import { 
  getCountries, 
  getCountry, 
  createCountry, 
  updateCountry, 
  deleteCountry,
  searchCountries,
  getCountryByLandmark
} from '../controllers/countryController';
import { processChatbotQuery } from '../services/chatbotService';
import { authenticateToken, isAdmin } from '../middleware/auth';

const router = express.Router();
router.get('/search', searchCountries);
// Existing routes
router.get('/', getCountries);
router.get('/:id', getCountry);
router.post('/', authenticateToken, isAdmin, createCountry);
router.put('/:id', authenticateToken, isAdmin, updateCountry);
router.delete('/:id', authenticateToken, isAdmin, deleteCountry);

// New routes for complex queries

router.get('/landmark/:landmark', getCountryByLandmark);

// Chatbot route
router.post('/chatbot', async (req, res) => {
  try {
    const { query } = req.body;
    const response = await processChatbotQuery(query);
    res.json({ response });
  } catch (error) {
    res.status(500).json({ message: 'Error processing chatbot query', error });
  }
});

export default router;