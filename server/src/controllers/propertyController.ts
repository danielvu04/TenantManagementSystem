import { Request, Response } from 'express';
import { IUser } from '../models/User';
import mongoose from 'mongoose';
import { AuthRequest } from '../middleware/auth';

// Get all properties
export const getProperties = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { Property } = await import('../models/Property');
    const properties = await Property.find({});
    res.json(properties);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

// Get properties for a landlord
export const getLandlordProperties = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { Property } = await import('../models/Property');
    const properties = await Property.find({ landlord: req.userId });
    res.json(properties);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

// Get a property by ID
export const getPropertyById = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { Property } = await import('../models/Property');
    const property = await Property.findById(req.params.id);
    
    if (!property) {
      res.status(404).json({ message: 'Property not found' });
      return;
    }
    
    res.json(property);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

// Create a new property
export const createProperty = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { Property } = await import('../models/Property');
    const { 
      title,
      description,
      address,
      type,
      bedrooms,
      bathrooms,
      squareFootage,
      amenities,
      price,
      status,
      images
    } = req.body;

    const newProperty = new Property({
      title,
      description,
      address,
      type,
      bedrooms,
      bathrooms,
      squareFootage,
      amenities,
      price,
      status: status || 'available',
      images,
      landlord: req.userId // Current authenticated user (landlord)
    });

    await newProperty.save();
    
    res.status(201).json(newProperty);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

// Update a property
export const updateProperty = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { Property } = await import('../models/Property');
    const { 
      title,
      description,
      address,
      type,
      bedrooms,
      bathrooms,
      squareFootage,
      amenities,
      price,
      status,
      images
    } = req.body;

    const property = await Property.findById(req.params.id);
    
    if (!property) {
      res.status(404).json({ message: 'Property not found' });
      return;
    }

    // Check if user is the property owner
    if (property.landlord.toString() !== req.userId?.toString() && req.userRole !== 'admin') {
      res.status(403).json({ message: 'Not authorized to update this property' });
      return;
    }

    // Update fields
    if (title) property.title = title;
    if (description) property.description = description;
    if (address) property.address = address;
    if (type) property.type = type;
    if (bedrooms) property.bedrooms = bedrooms;
    if (bathrooms) property.bathrooms = bathrooms;
    if (squareFootage) property.squareFootage = squareFootage;
    if (amenities) property.amenities = amenities;
    if (price) property.price = price;
    if (status) property.status = status;
    if (images) property.images = images;

    const updatedProperty = await property.save();
    
    res.json(updatedProperty);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

// Delete a property
export const deleteProperty = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { Property } = await import('../models/Property');
    const property = await Property.findById(req.params.id);
    
    if (!property) {
      res.status(404).json({ message: 'Property not found' });
      return;
    }

    // Check if user is the property owner
    if (property.landlord.toString() !== req.userId?.toString() && req.userRole !== 'admin') {
      res.status(403).json({ message: 'Not authorized to delete this property' });
      return;
    }

    await Property.findByIdAndDelete(req.params.id);
    
    res.json({ message: 'Property deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
}; 