export interface User {
  _id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: 'tenant' | 'landlord' | 'admin';
  phone?: string;
  profileImage?: string;
  createdAt?: Date;
  updatedAt?: Date;
} 