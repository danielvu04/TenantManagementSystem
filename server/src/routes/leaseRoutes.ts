import express from 'express';
import {
  createLease,
  getLandlordLeases,
  getTenantLeases,
  getLeaseById,
  updateLease,
  deleteLease,
} from '../controllers/leaseController';
import { auth, checkRole } from '../middleware/auth';

const router = express.Router();

// Protected routes (landlord only)
router.post('/', auth, checkRole(['landlord', 'admin']), createLease);
router.get('/landlord', auth, checkRole(['landlord', 'admin']), getLandlordLeases);
router.get('/tenant', auth, checkRole(['tenant', 'admin']), getTenantLeases);
router.get('/:id', auth, getLeaseById);
router.patch('/:id', auth, checkRole(['landlord', 'admin']), updateLease);
router.delete('/:id', auth, checkRole(['landlord', 'admin']), deleteLease);

export default router; 