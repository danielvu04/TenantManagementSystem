import mongoose, { Document, Schema } from 'mongoose';

export interface IPayment extends Document {
  property: mongoose.Types.ObjectId;
  tenant: mongoose.Types.ObjectId;
  amount: number;
  type: 'rent' | 'deposit' | 'late_fee' | 'maintenance' | 'other';
  status: 'pending' | 'completed' | 'failed' | 'refunded';
  dueDate: Date;
  paidDate?: Date;
  stripePaymentIntentId?: string;
  description?: string;
  createdAt: Date;
  updatedAt: Date;
}

const paymentSchema = new Schema<IPayment>({
  property: {
    type: Schema.Types.ObjectId,
    ref: 'Property',
    required: true,
  },
  tenant: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  amount: {
    type: Number,
    required: true,
    min: 0,
  },
  type: {
    type: String,
    enum: ['rent', 'deposit', 'late_fee', 'maintenance', 'other'],
    required: true,
  },
  status: {
    type: String,
    enum: ['pending', 'completed', 'failed', 'refunded'],
    default: 'pending',
  },
  dueDate: {
    type: Date,
    required: true,
  },
  paidDate: {
    type: Date,
  },
  stripePaymentIntentId: {
    type: String,
    trim: true,
  },
  description: {
    type: String,
    trim: true,
  },
}, {
  timestamps: true,
});

export const Payment = mongoose.model<IPayment>('Payment', paymentSchema); 