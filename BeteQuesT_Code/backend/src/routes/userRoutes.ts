import express from 'express';
import { registerUser, loginUser } from '../controllers/userController';
import { 
  createProfile, 
  getProfile, 
  updateProfile,
  addToWishlist,
  removeFromWishlist,
  addToVisitedCountries,
  removeFromVisitedCountries,
  addComment,
  getComments
} from '../controllers/userProfileController';
import { authenticateToken } from '../middleware/auth';

const router = express.Router();



router.post('/register', registerUser);
router.post('/login', loginUser);

router.post('/profile', authenticateToken, createProfile);
router.get('/profile', authenticateToken, getProfile);
router.put('/profile', authenticateToken, updateProfile);

// Existing routes
router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/profile', authenticateToken, createProfile);
router.get('/profile', authenticateToken, getProfile);
router.put('/profile', authenticateToken, updateProfile);

// New routes for wishlist and visited countries
router.post('/profile/wishlist', authenticateToken, addToWishlist);
router.delete('/profile/wishlist/:countryId', authenticateToken, removeFromWishlist);
router.post('/profile/visited', authenticateToken, addToVisitedCountries);
router.delete('/profile/visited/:countryId', authenticateToken, removeFromVisitedCountries);

router.post('/profile/comments', authenticateToken, addComment);
router.get('/profile/comments', authenticateToken, getComments);

export default router;

