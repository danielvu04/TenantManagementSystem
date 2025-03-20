import { Request, Response } from 'express';
import { IUser } from '../models/User';
import mongoose from 'mongoose';
import { AuthRequest } from '../middleware/auth';

// Create a new lease
export const createLease = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { 
      propertyId, 
      tenantId, 
      startDate, 
      endDate, 
      rentAmount, 
      depositAmount, 
      terms,
      documents
    } = req.body;

    // Import models here to avoid circular dependency issues
    const { Property } = await import('../models/Property');
    const { User } = await import('../models/User');
    const { Lease } = await import('../models/Lease');

    // Validate property exists
    const property = await Property.findById(propertyId);
    if (!property) {
      res.status(404).json({ message: 'Property not found' });
      return;
    }

    // Validate tenant exists
    const tenant = await User.findById(tenantId);
    if (!tenant || tenant.role !== 'tenant') {
      res.status(404).json({ message: 'Tenant not found' });
      return;
    }

    // Create new lease
    const newLease = new Lease({
      property: propertyId,
      tenant: tenantId,
      landlord: req.userId, // Current authenticated user (landlord)
      startDate,
      endDate,
      rentAmount,
      depositAmount,
      terms,
      documents,
      status: 'draft'
    });

    await newLease.save();
    
    res.status(201).json(newLease);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

// Get all leases for a landlord
export const getLandlordLeases = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { Lease } = await import('../models/Lease');
    
    const leases = await Lease.find({ landlord: req.userId })
      .populate('property')
      .populate('tenant', '-password');
    
    res.json(leases);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

// Get all leases for a tenant
export const getTenantLeases = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { Lease } = await import('../models/Lease');
    
    const leases = await Lease.find({ tenant: req.userId })
      .populate('property')
      .populate('landlord', '-password');
    
    res.json(leases);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

// Get a lease by ID
export const getLeaseById = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { Lease } = await import('../models/Lease');
    
    const lease = await Lease.findById(req.params.id)
      .populate('property')
      .populate('tenant', '-password')
      .populate('landlord', '-password');
    
    if (!lease) {
      res.status(404).json({ message: 'Lease not found' });
      return;
    }

    // Check if user is authorized to view this lease
    if (
      lease.tenant.toString() !== req.userId?.toString() && 
      lease.landlord.toString() !== req.userId?.toString() &&
      req.userRole !== 'admin'
    ) {
      res.status(403).json({ message: 'Not authorized to view this lease' });
      return;
    }
    
    res.json(lease);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

// Update a lease
export const updateLease = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { Lease } = await import('../models/Lease');
    
    const { 
      startDate, 
      endDate, 
      rentAmount, 
      depositAmount, 
      terms,
      documents,
      status,
      signatures
    } = req.body;

    const lease = await Lease.findById(req.params.id);
    if (!lease) {
      res.status(404).json({ message: 'Lease not found' });
      return;
    }

    // Check if user is authorized to update this lease
    if (
      lease.landlord.toString() !== req.userId?.toString() &&
      req.userRole !== 'admin'
    ) {
      res.status(403).json({ message: 'Not authorized to update this lease' });
      return;
    }

    // Update fields
    if (startDate) lease.startDate = startDate;
    if (endDate) lease.endDate = endDate;
    if (rentAmount) lease.rentAmount = rentAmount;
    if (depositAmount) lease.depositAmount = depositAmount;
    if (terms) lease.terms = terms;
    if (documents) lease.documents = documents;
    if (status) lease.status = status;
    if (signatures) lease.signatures = signatures;

    const updatedLease = await lease.save();
    
    res.json(updatedLease);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

// Delete a lease
export const deleteLease = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { Lease } = await import('../models/Lease');
    
    const lease = await Lease.findById(req.params.id);
    if (!lease) {
      res.status(404).json({ message: 'Lease not found' });
      return;
    }

    // Check if user is authorized to delete this lease
    if (
      lease.landlord.toString() !== req.userId?.toString() &&
      req.userRole !== 'admin'
    ) {
      res.status(403).json({ message: 'Not authorized to delete this lease' });
      return;
    }

    await Lease.findByIdAndDelete(req.params.id);
    
    res.json({ message: 'Lease deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
}; 