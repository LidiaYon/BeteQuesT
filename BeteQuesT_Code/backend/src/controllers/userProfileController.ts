import { Request, Response } from 'express';
import { UserProfile } from '../models/UserProfile';
import { Country } from '../models/Country';

export const createProfile = async (req: Request, res: Response) => {
  try {
    if (!req.user || !req.user._id) {
      console.error('Create Profile: User not authenticated');
      return res.status(401).json({ message: 'Unauthorized: User not authenticated' });
    }
    console.log('Creating profile for user:', req.user._id);
    const existingProfile = await UserProfile.findOne({ user: req.user._id });
    if (existingProfile) {
      console.log('Profile already exists for user:', req.user._id);
      return res.status(400).json({ message: 'Profile already exists' });
    }
    const profile = new UserProfile({
      user: req.user._id,
      fullName: req.body.fullName || req.user.username,
      bio: req.body.bio || '',
      interests: req.body.interests || [],
      visitedCountries: [],
      wishlist: [],
      comments: []
    });
    await profile.save();
    console.log('Profile created successfully:', profile);
    res.status(201).json(profile);
  } catch (error) {
    console.error('Error creating profile:', error);
    res.status(500).json({ message: 'Error creating profile', error: (error as Error).message });
  }
};

// export const getProfile = async (req: Request, res: Response) => {
//   try {
//     if (!req.user || !req.user._id) {
//       console.error('Get Profile: User not authenticated');
//       return res.status(401).json({ message: 'Unauthorized: User not authenticated' });
//     }
//     console.log('Getting profile for user:', req.user._id);
//     let profile = await UserProfile.findOne({ user: req.user._id });
//     if (!profile) {
//       console.log('Profile not found, creating new profile for user:', req.user._id);
//       profile = await createProfileIfNotExists(req.user._id, req.user.username);
//     }
//     console.log('Profile retrieved:', profile);
//     res.json(profile);
//   } catch (error) {
//     console.error('Error fetching profile:', error);
//     res.status(500).json({ message: 'Error fetching profile', error: (error as Error).message });
//   }
// };


export const updateProfile = async (req: Request, res: Response) => {
  try {
    if (!req.user || !req.user._id) {
      return res.status(401).json({ message: 'Unauthorized: User not authenticated' });
    }
    console.log('Updating profile for user:', req.user._id);
    const profile = await UserProfile.findOneAndUpdate(
      { user: req.user._id },
      req.body,
      { new: true, runValidators: true }
    );
    if (!profile) {
      return res.status(404).json({ message: 'Profile not found' });
    }
    res.json(profile);
  } catch (error) {
    console.error('Error updating profile:', error);
    res.status(500).json({ message: 'Error updating profile', error: (error as Error).message });
  }
};


const createProfileIfNotExists = async (userId: string, username: string) => {
  console.log('Creating new profile for user:', userId);
  const newProfile = new UserProfile({
    user: userId,
    fullName: username,
    bio: '',
    interests: [],
    visitedCountries: [],
    wishlist: [],
    comments: []
  });
  await newProfile.save();
  console.log('New profile created:', newProfile);
  return newProfile;
};

// ... rest of the controller methods


// export const addToWishlist = async (req: Request, res: Response) => {
//   try {
//     if (!req.user || !req.user._id) {
//       return res.status(401).json({ message: 'Unauthorized: User not authenticated' });
//     }
//     const { countryId } = req.body;
//     const country = await Country.findById(countryId);
//     if (!country) {
//       return res.status(404).json({ message: 'Country not found' });
//     }
//     const profile = await UserProfile.findOneAndUpdate(
//       { user: req.user._id },
//       { $addToSet: { wishlist: countryId } },
//       { new: true, upsert: true, runValidators: true }
//     );
//     res.json({ ...profile.toObject(), wishlist: profile.wishlist.map(id => id.toString()) });
//   } catch (error) {
//     console.error('Error adding to wishlist:', error);
//     res.status(500).json({ message: 'Error adding to wishlist', error: (error as Error).message });
//   }
// };

export const removeFromWishlist = async (req: Request, res: Response) => {
  try {
    if (!req.user || !req.user._id) {
      return res.status(401).json({ message: 'Unauthorized: User not authenticated' });
    }
    const { countryId } = req.params;
    const profile = await UserProfile.findOneAndUpdate(
      { user: req.user._id },
      { $pull: { wishlist: countryId } },
      { new: true }
    );
    if (!profile) {
      return res.status(404).json({ message: 'Profile not found' });
    }
    res.json({ ...profile.toObject(), wishlist: profile.wishlist.map(id => id.toString()) });
  } catch (error) {
    console.error('Error removing from wishlist:', error);
    res.status(500).json({ message: 'Error removing from wishlist', error: (error as Error).message });
  }
};

// export const addToVisitedCountries = async (req: Request, res: Response) => {
//   try {
//     if (!req.user || !req.user._id) {
//       return res.status(401).json({ message: 'Unauthorized: User not authenticated' });
//     }
//     const { countryId } = req.body;
//     const country = await Country.findById(countryId);
//     if (!country) {
//       return res.status(404).json({ message: 'Country not found' });
//     }
//     const profile = await UserProfile.findOneAndUpdate(
//       { user: req.user._id },
//       { $addToSet: { visitedCountries: countryId } },
//       { new: true, upsert: true, runValidators: true }
//     );
//     res.json({ ...profile.toObject(), visitedCountries: profile.visitedCountries.map(id => id.toString()) });
//   } catch (error) {
//     console.error('Error adding to visited countries:', error);
//     res.status(500).json({ message: 'Error adding to visited countries', error: (error as Error).message });
//   }
// };


export const addToWishlist = async (req: Request, res: Response) => {
  try {
    if (!req.user || !req.user._id) {
      return res.status(401).json({ message: 'Unauthorized: User not authenticated' });
    }
    const { countryId } = req.body;
    const country = await Country.findById(countryId);
    if (!country) {
      return res.status(404).json({ message: 'Country not found' });
    }
    const profile = await UserProfile.findOneAndUpdate(
      { user: req.user._id },
      { $addToSet: { wishlist: countryId } },
      { new: true, upsert: true, runValidators: true }
    );
    res.json(profile);
  } catch (error) {
    console.error('Error adding to wishlist:', error);
    res.status(500).json({ message: 'Error adding to wishlist', error: (error as Error).message });
  }
};

export const addToVisitedCountries = async (req: Request, res: Response) => {
  try {
    if (!req.user || !req.user._id) {
      return res.status(401).json({ message: 'Unauthorized: User not authenticated' });
    }
    const { countryId } = req.body;
    const country = await Country.findById(countryId);
    if (!country) {
      return res.status(404).json({ message: 'Country not found' });
    }
    const profile = await UserProfile.findOneAndUpdate(
      { user: req.user._id },
      { $addToSet: { visitedCountries: countryId } },
      { new: true, upsert: true, runValidators: true }
    );
    res.json(profile);
  } catch (error) {
    console.error('Error adding to visited countries:', error);
    res.status(500).json({ message: 'Error adding to visited countries', error: (error as Error).message });
  }
};

// export const getProfile = async (req: Request, res: Response) => {
//   try {
//     if (!req.user || !req.user._id) {
//       return res.status(401).json({ message: 'Unauthorized: User not authenticated' });
//     }
//     const profile = await UserProfile.findOne({ user: req.user._id })
//       .populate('visitedCountries', 'name')
//       .populate('wishlist', 'name');
//     if (!profile) {
//       return res.status(404).json({ message: 'Profile not found' });
//     }
//     res.json(profile);
//   } catch (error) {
//     console.error('Error fetching profile:', error);
//     res.status(500).json({ message: 'Error fetching profile', error: (error as Error).message });
//   }
// };


// export const getProfile = async (req: Request, res: Response) => {
//   try {
//     if (!req.user || !req.user._id) {
//       return res.status(401).json({ message: 'Unauthorized: User not authenticated' });
//     }
//     const profile = await UserProfile.findOne({ user: req.user._id })
//       .populate('visitedCountries', 'name')
//       .populate('wishlist', 'name');
//     if (!profile) {
//       return res.status(404).json({ message: 'Profile not found' });
//     }
//     console.log('Profile data:', JSON.stringify(profile, null, 2));
//     res.json(profile);
//   } catch (error) {
//     console.error('Error fetching profile:', error);
//     res.status(500).json({ message: 'Error fetching profile', error: (error as Error).message });
//   }
// };


export const getProfile = async (req: Request, res: Response) => {
  try {
    console.log('Fetching profile for user:', req.user?._id);
    if (!req.user || !req.user._id) {
      return res.status(401).json({ message: 'Unauthorized: User not authenticated' });
    }
    const profile = await UserProfile.findOne({ user: req.user._id })
      .populate('visitedCountries', 'name')
      .populate('wishlist', 'name');
    console.log('Profile found:', profile);
    if (!profile) {
      return res.status(404).json({ message: 'Profile not found' });
    }
    res.json(profile);
  } catch (error) {
    console.error('Error fetching profile:', error);
    res.status(500).json({ message: 'Error fetching profile', error: (error as Error).message });
  }
};

export const removeFromVisitedCountries = async (req: Request, res: Response) => {
  try {
    if (!req.user || !req.user._id) {
      return res.status(401).json({ message: 'Unauthorized: User not authenticated' });
    }
    const { countryId } = req.params;
    const profile = await UserProfile.findOneAndUpdate(
      { user: req.user._id },
      { $pull: { visitedCountries: countryId } },
      { new: true }
    );
    if (!profile) {
      return res.status(404).json({ message: 'Profile not found' });
    }
    res.json({ ...profile.toObject(), visitedCountries: profile.visitedCountries.map(id => id.toString()) });
  } catch (error) {
    console.error('Error removing from visited countries:', error);
    res.status(500).json({ message: 'Error removing from visited countries', error: (error as Error).message });
  }
};

export const addComment = async (req: Request, res: Response) => {
  try {
    if (!req.user || !req.user._id) {
      return res.status(401).json({ message: 'Unauthorized: User not authenticated' });
    }
    const { countryId, text } = req.body;
    const country = await Country.findById(countryId);
    if (!country) {
      return res.status(404).json({ message: 'Country not found' });
    }
    let profile = await UserProfile.findOne({ user: req.user._id });
    if (!profile) {
      profile = new UserProfile({ user: req.user._id, fullName: 'New User', comments: [] });
    }
    const newComment = { countryId, text, createdAt: new Date() };
    profile.comments.push(newComment);
    await profile.save();
    res.status(201).json(newComment);
  } catch (error) {
    console.error('Error adding comment:', error);
    res.status(500).json({ message: 'Error adding comment', error: (error as Error).message });
  }
};

export const getComments = async (req: Request, res: Response) => {
  try {
    if (!req.user || !req.user._id) {
      return res.status(401).json({ message: 'Unauthorized: User not authenticated' });
    }
    const profile = await UserProfile.findOne({ user: req.user._id });
    if (!profile) {
      return res.json([]);  // Return an empty array if profile doesn't exist
    }
    res.json(profile.comments);
  } catch (error) {
    console.error('Error getting comments:', error);
    res.status(500).json({ message: 'Error getting comments', error: (error as Error).message });
  }
};