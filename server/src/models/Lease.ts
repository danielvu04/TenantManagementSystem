import mongoose, { Document, Schema } from 'mongoose';

export interface ILease extends Document {
  property: mongoose.Types.ObjectId;
  tenant: mongoose.Types.ObjectId;
  landlord: mongoose.Types.ObjectId;
  startDate: Date;
  endDate: Date;
  rentAmount: number;
  depositAmount: number;
  status: 'draft' | 'pending' | 'active' | 'expired' | 'terminated';
  terms: {
    utilities: string[];
    parking: boolean;
    pets: boolean;
    maxOccupants: number;
    maintenanceResponsibilities: string[];
  };
  documents: {
    leaseAgreement: string;
    addendums?: string[];
  };
  signatures: {
    tenant?: {
      signature: string;
      date: Date;
    };
    landlord?: {
      signature: string;
      date: Date;
    };
  };
  createdAt: Date;
  updatedAt: Date;
}

const leaseSchema = new Schema<ILease>({
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
  landlord: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  startDate: {
    type: Date,
    required: true,
  },
  endDate: {
    type: Date,
    required: true,
  },
  rentAmount: {
    type: Number,
    required: true,
    min: 0,
  },
  depositAmount: {
    type: Number,
    required: true,
    min: 0,
  },
  status: {
    type: String,
    enum: ['draft', 'pending', 'active', 'expired', 'terminated'],
    default: 'draft',
  },
  terms: {
    utilities: [{
      type: String,
      trim: true,
    }],
    parking: {
      type: Boolean,
      default: false,
    },
    pets: {
      type: Boolean,
      default: false,
    },
    maxOccupants: {
      type: Number,
      required: true,
      min: 1,
    },
    maintenanceResponsibilities: [{
      type: String,
      trim: true,
    }],
  },
  documents: {
    leaseAgreement: {
      type: String,
      required: true,
    },
    addendums: [{
      type: String,
      trim: true,
    }],
  },
  signatures: {
    tenant: {
      signature: String,
      date: Date,
    },
    landlord: {
      signature: String,
      date: Date,
    },
  },
}, {
  timestamps: true,
});

export const Lease = mongoose.model<ILease>('Lease', leaseSchema); 