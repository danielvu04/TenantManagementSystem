export interface MaintenanceRequest {
  _id?: string;
  propertyId: string;
  tenantId: string;
  landlordId: string;
  title: string;
  description: string;
  priority: 'low' | 'medium' | 'high' | 'emergency';
  status: 'pending' | 'in_progress' | 'completed' | 'cancelled';
  category: 'plumbing' | 'electrical' | 'appliance' | 'structural' | 'hvac' | 'other';
  images?: string[];
  assignedTo?: string; // ID of maintenance personnel
  availableTimeSlots?: string[];
  scheduledDate?: Date;
  completionDate?: Date;
  notes?: string;
  createdAt?: Date;
  updatedAt?: Date;
} 