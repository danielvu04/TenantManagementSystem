import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import mongoose, { Document } from 'mongoose';
import { IUser } from '../models/User';

// Extended Request interface to include user
export interface AuthRequest extends Request {
  user?: IUser & Document;
  userId?: string;
  userRole?: string;
}

// Auth middleware
export const auth = async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    // Get token from header
    const token = req.header('Authorization')?.replace('Bearer ', '');
    
    if (!token) {
      res.status(401).json({ error: 'Authentication required' });
      return;
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your_jwt_secret_key') as { _id: string };
    
    // Import User model here to avoid circular dependency
    const { User } = await import('../models/User');
    
    // Find user with explicit typing
    const user = await User.findById(decoded._id).exec() as (IUser & Document) | null;
    
    if (!user) {
      res.status(401).json({ error: 'Invalid credentials' });
      return;
    }

    // Add user, userId and userRole to req object
    req.user = user;
    req.userId = user.id;
    req.userRole = user.role;
    
    next();
  } catch (error) {
    res.status(401).json({ error: 'Please authenticate' });
  }
};

// Check role middleware
export const checkRole = (roles: string[]) => {
  return async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
    if (!req.user || !req.userRole) {
      res.status(401).json({ error: 'Authentication required' });
      return;
    }
    
    if (!roles.includes(req.userRole)) {
      res.status(403).json({ error: 'Access denied' });
      return;
    }
    
    next();
  };
}; 