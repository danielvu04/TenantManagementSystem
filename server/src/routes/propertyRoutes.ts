import express from 'express';
import {
  getProperties,
  getLandlordProperties,
  getPropertyById,
  createProperty,
  updateProperty,
  deleteProperty,
} from '../controllers/propertyController';
import { auth, checkRole } from '../middleware/auth';

const router = express.Router();

// Public routes
router.get('/', getProperties);
router.get('/:id', getPropertyById);

// Protected routes (landlord only)
router.post('/', auth, checkRole(['landlord', 'admin']), createProperty);
router.get('/landlord/properties', auth, checkRole(['landlord', 'admin']), getLandlordProperties);
router.patch('/:id', auth, checkRole(['landlord', 'admin']), updateProperty);
router.delete('/:id', auth, checkRole(['landlord', 'admin']), deleteProperty);

export default router; 