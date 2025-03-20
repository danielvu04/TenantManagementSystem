export interface Payment {
  _id?: string;
  leaseId: string;
  tenantId: string;
  landlordId: string;
  amount: number;
  paymentDate: Date;
  dueDate: Date;
  status: 'pending' | 'paid' | 'late' | 'failed';
  paymentMethod: 'card' | 'bank_transfer' | 'cash' | 'other';
  paymentReference?: string; // transaction ID from payment processor
  description: string; // e.g., "Rent for April 2023"
  lateFee?: number;
  createdAt?: Date;
  updatedAt?: Date;
} 