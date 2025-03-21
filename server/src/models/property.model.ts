import mongoose, { Schema, Document } from 'mongoose';

export interface IPropertyUnit extends Document {
  unitNumber: string;
  type: string;
  bedrooms: number;
  bathrooms: number;
  size: number;
  rent: number;
  status: 'available' | 'occupied' | 'maintenance';
}

export interface IProperty extends Document {
  name: string;
  address: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  };
  description: string;
  type: string;
  yearBuilt: number;
  squareFootage: number;
  sqft: number;
  price: number;
  bedrooms: number;
  bathrooms: number;
  units: number;
  occupiedUnits: number;
  income: number;
  expenses: number;
  pendingPayments: number;
  status: 'active' | 'inactive' | 'maintenance' | 'available';
  images: string[];
  features: string[];
  isAvailable: boolean;
  monthlyRoi: number;
  unitsList: IPropertyUnit[];
  createdAt: Date;
  updatedAt: Date;
}

const PropertyUnitSchema = new Schema<IPropertyUnit>({
  unitNumber: { type: String, required: true },
  type: { type: String, required: true },
  bedrooms: { type: Number, required: true },
  bathrooms: { type: Number, required: true },
  size: { type: Number, required: true },
  rent: { type: Number, required: true },
  status: { type: String, enum: ['available', 'occupied', 'maintenance'], default: 'available' }
});

const PropertySchema = new Schema<IProperty>({
  name: { type: String, required: true },
  address: {
    street: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    zipCode: { type: String, required: true },
    country: { type: String, required: true }
  },
  description: { type: String, required: true },
  type: { type: String, required: true },
  yearBuilt: { type: Number, required: true },
  squareFootage: { type: Number, required: true },
  sqft: { type: Number },
  price: { type: Number },
  bedrooms: { type: Number },
  bathrooms: { type: Number },
  units: { type: Number, required: true },
  occupiedUnits: { type: Number, default: 0 },
  income: { type: Number, default: 0 },
  expenses: { type: Number, default: 0 },
  pendingPayments: { type: Number, default: 0 },
  status: { 
    type: String, 
    enum: ['active', 'inactive', 'maintenance', 'available'], 
    default: 'available' 
  },
  images: [{ type: String }],
  features: [{ type: String }],
  isAvailable: { type: Boolean, default: true },
  monthlyRoi: { type: Number },
  unitsList: [PropertyUnitSchema],
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
}, { timestamps: true });

export const Property = mongoose.model<IProperty>('Property', PropertySchema); 