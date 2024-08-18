import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import{ User } from '../models/User';
import { UserProfile } from '../models/UserProfile';



// export const registerUser = async (req: Request, res: Response) => {
//   try {
//     const { username, email, password } = req.body;
//     const existingUser = await User.findOne({ email });
//     if (existingUser) {
//       return res.status(400).json({ message: 'User already exists' });
//     }
//     const user = new User({ username, email, password });
//     await user.save();
//     res.status(201).json({ message: 'User registered successfully' });
//   } catch (error) {
//     res.status(500).json({ message: 'Error registering user', error });
//   }
// };

// export const registerUser = async (req: Request, res: Response) => {
//   try {
//     const { username, email, password } = req.body;
//     const existingUser = await User.findOne({ email });
//     if (existingUser) {
//       return res.status(400).json({ message: 'User already exists' });
//     }
//     const user = new User({ username, email, password });
//     await user.save();
//     res.status(201).json({ message: 'User registered successfully', userId: user._id });
//   } catch (error) {
//     res.status(500).json({ message: 'Error registering user', error });
//   }
// };



export const registerUser = async (req: Request, res: Response) => {
  try {
    const { username, email, password } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }
    const user = new User({ username, email, password });
    await user.save();

    // Create user profile
    const userProfile = new UserProfile({
      user: user._id,
      fullName: username,
      bio: '',
      interests: [],
      visitedCountries: [],
      wishlist: [],
      comments: []
    });
    await userProfile.save();

    res.status(201).json({ message: 'User registered successfully', userId: user._id });
  } catch (error) {
    res.status(500).json({ message: 'Error registering user', error });
  }
};

export const loginUser = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET as string, { expiresIn: '1d' });
    res.json({ token, userId: user._id, username: user.username });
  } catch (error) {
    res.status(500).json({ message: 'Error logging in', error });
  }
};
