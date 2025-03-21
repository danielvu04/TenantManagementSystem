import { Request, Response } from 'express';
import { Property } from '../models/property.model';

// Get all properties with optional filtering
export const getProperties = async (req: Request, res: Response) => {
  try {
    const filter: any = {};
    
    // Apply filters if provided
    if (req.query.status) filter.status = req.query.status;
    if (req.query.type) filter.type = req.query.type;
    if (req.query.bedrooms) filter.bedrooms = { $gte: parseInt(req.query.bedrooms as string) };
    if (req.query.bathrooms) filter.bathrooms = { $gte: parseInt(req.query.bathrooms as string) };
    if (req.query.minPrice) filter.price = { ...filter.price, $gte: parseInt(req.query.minPrice as string) };
    if (req.query.maxPrice) filter.price = { ...filter.price, $lte: parseInt(req.query.maxPrice as string) };
    if (req.query.minSqft) filter.sqft = { ...filter.sqft, $gte: parseInt(req.query.minSqft as string) };
    if (req.query.maxSqft) filter.sqft = { ...filter.sqft, $lte: parseInt(req.query.maxSqft as string) };
    if (req.query.isAvailable) filter.isAvailable = req.query.isAvailable === 'true';
    
    // Apply text search if provided
    if (req.query.search) {
      filter.$or = [
        { name: { $regex: req.query.search, $options: 'i' } },
        { description: { $regex: req.query.search, $options: 'i' } },
        { 'address.city': { $regex: req.query.search, $options: 'i' } },
        { 'address.state': { $regex: req.query.search, $options: 'i' } }
      ];
    }
    
    const properties = await Property.find(filter);
    res.status(200).json(properties);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching properties', error });
  }
};

// Get property by ID
export const getPropertyById = async (req: Request, res: Response) => {
  try {
    const property = await Property.findById(req.params.id);
    if (!property) {
      return res.status(404).json({ message: 'Property not found' });
    }
    res.status(200).json(property);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching property', error });
  }
};

// Create new property
export const createProperty = async (req: Request, res: Response) => {
  try {
    const newProperty = new Property(req.body);
    const savedProperty = await newProperty.save();
    res.status(201).json(savedProperty);
  } catch (error) {
    res.status(400).json({ message: 'Error creating property', error });
  }
};

// Update property
export const updateProperty = async (req: Request, res: Response) => {
  try {
    const property = await Property.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    
    if (!property) {
      return res.status(404).json({ message: 'Property not found' });
    }
    
    res.status(200).json(property);
  } catch (error) {
    res.status(400).json({ message: 'Error updating property', error });
  }
};

// Delete property
export const deleteProperty = async (req: Request, res: Response) => {
  try {
    const property = await Property.findByIdAndDelete(req.params.id);
    
    if (!property) {
      return res.status(404).json({ message: 'Property not found' });
    }
    
    res.status(200).json({ message: 'Property deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting property', error });
  }
}; 