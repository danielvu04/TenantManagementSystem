import mongoose, { Document, Schema } from 'mongoose';

export interface IProperty extends Document {
  title: string;
  description: string;
  address: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
  };
  type: 'house' | 'apartment' | 'condo' | 'townhouse';
  bedrooms: number;
  bathrooms: number;
  squareFootage: number;
  amenities: string[];
  price: number;
  status: 'available' | 'rented' | 'maintenance';
  images: string[];
  landlord: mongoose.Types.ObjectId;
  currentTenant?: mongoose.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const propertySchema = new Schema<IProperty>({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
  },
  address: {
    street: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    state: {
      type: String,
      required: true,
    },
    zipCode: {
      type: String,
      required: true,
    },
  },
  type: {
    type: String,
    enum: ['house', 'apartment', 'condo', 'townhouse'],
    required: true,
  },
  bedrooms: {
    type: Number,
    required: true,
    min: 0,
  },
  bathrooms: {
    type: Number,
    required: true,
    min: 0,
  },
  squareFootage: {
    type: Number,
    required: true,
    min: 0,
  },
  amenities: [{
    type: String,
    trim: true,
  }],
  price: {
    type: Number,
    required: true,
    min: 0,
  },
  status: {
    type: String,
    enum: ['available', 'rented', 'maintenance'],
    default: 'available',
  },
  images: [{
    type: String,
    trim: true,
  }],
  landlord: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  currentTenant: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
}, {
  timestamps: true,
});

export const Property = mongoose.model<IProperty>('Property', propertySchema); 