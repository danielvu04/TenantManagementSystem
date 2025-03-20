export interface Lease {
  _id?: string;
  propertyId: string;
  tenantId: string;
  landlordId: string;
  startDate: Date;
  endDate: Date;
  rentAmount: number;
  securityDeposit: number;
  isActive: boolean;
  leaseTerms: string;
  paymentDueDay: number; // day of month when rent is due
  lateFeeAmount: number;
  lateFeeGracePeriod: number; // days after due date before late fee applies
  documents?: string[]; // URLs to stored lease documents
  renewalOption: boolean;
  createdAt?: Date;
  updatedAt?: Date;
} 