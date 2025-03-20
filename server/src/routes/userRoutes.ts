import express from 'express';
import {
  register,
  login,
  getProfile,
  updateProfile,
  changePassword,
} from '../controllers/userController';
import { auth, checkRole } from '../middleware/auth';

const router = express.Router();

// Public routes
router.post('/register', register);
router.post('/login', login);

// Protected routes
router.get('/profile/:id', auth, getProfile);
router.patch('/profile/:id', auth, updateProfile);
router.post('/profile/:id/change-password', auth, changePassword);

// Admin only routes
router.get('/users', auth, checkRole(['admin']), (req, res) => {
  res.json({ message: "Admin access granted" });
});

export default router; 