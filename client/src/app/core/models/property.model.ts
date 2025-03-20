export interface PropertyUnit {
  id: string;
  unitNumber: string;
  type: string;
  bedrooms: number;
  bathrooms: number;
  size: number;
  rent: number;
  status: 'available' | 'occupied' | 'maintenance';
}

export interface Tenant {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  unitNumber: string;
  leaseId: string;
  leaseStart: Date;
  leaseEnd: Date;
}

export interface MaintenanceRequest {
  id: string;
  title: string;
  description: string;
  unitNumber: string;
  dateSubmitted: Date;
  priority: 'low' | 'medium' | 'high' | 'emergency';
  status: 'pending' | 'in-progress' | 'completed';
}

export interface Property {
  _id: string;
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
  units: number;
  occupiedUnits: number;
  income: number;
  expenses: number;
  pendingPayments: number;
  status: 'active' | 'inactive' | 'maintenance';
  images: string[];
  
  // Fields needed for property-list component
  bedrooms: number;
  bathrooms: number;
  isAvailable: boolean;
  
  // Optional nested arrays
  unitsList?: PropertyUnit[];
  tenants?: Tenant[];
  maintenanceRequests?: MaintenanceRequest[];
} 