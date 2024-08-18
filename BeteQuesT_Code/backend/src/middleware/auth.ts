// 


import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { User, IUser } from '../models/User';

// export const authenticateToken = async (req: Request, res: Response, next: NextFunction) => {
//   const authHeader = req.headers['authorization'];
//   const token = authHeader && authHeader.split(' ')[1];

//   if (token == null) return res.sendStatus(401);

//   try {
//     const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as { userId: string };
//     const user = await User.findById(decoded.userId);
//     if (!user) {
//       return res.sendStatus(401);
//     }
//     (req as any).user = user as IUser;
//     next();
//   } catch (error) {
//     return res.sendStatus(403);
//   }
// };

export const authenticateToken = async (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (token == null) return res.sendStatus(401);

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as { userId: string };
    const user = await User.findById(decoded.userId);
    if (!user) {
      return res.sendStatus(401);
    }
    (req as any).user = user;
    next();
  } catch (error) {
    return res.sendStatus(403);
  }
};

export const isAdmin = (req: Request, res: Response, next: NextFunction) => {
  const userReq = req as Request & { user?: IUser };
  if (userReq.user && userReq.user.role === 'admin') {
    next();
  } else {
    res.status(403).json({ message: 'Access denied' });
  }
};