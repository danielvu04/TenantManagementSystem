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
  id?: string; // For backwards compatibility
  name: string;
  address: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
    zip?: string; // For backwards compatibility
    country: string;
  };
  description: string;
  type: string;
  yearBuilt: number;
  squareFootage: number;
  sqft?: number; // For backwards compatibility
  price?: number; // For backwards compatibility
  bedrooms?: number; // For property-list component
  bathrooms?: number; // For property-list component
  units: number;
  occupiedUnits: number;
  income: number;
  expenses: number;
  pendingPayments: number;
  status: 'active' | 'inactive' | 'maintenance' | 'available';
  images: string[];
  features?: string[]; // For property-detail component
  isAvailable?: boolean; // For property-list component
  monthlyRoi?: number; // For property list component
  agent?: {
    name: string;
    email: string;
    phone: string;
    image: string;
  };
  
  // Optional nested arrays
  unitsList?: PropertyUnit[];
  tenants?: Tenant[];
  maintenanceRequests?: MaintenanceRequest[];
  createdAt?: Date;
  updatedAt?: Date;
} 