import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { Property } from '../models/property.model';

// Load environment variables
dotenv.config();

// Sample properties to seed
const propertyData = [
  {
    name: 'Millpond',
    address: {
      street: '11660 Millpond Ave',
      city: 'Burnsville',
      state: 'MN',
      zipCode: '55337',
      country: 'USA'
    },
    description: 'Modern apartments with spacious floor plans and luxury amenities.',
    type: 'apartment',
    yearBuilt: 2010,
    squareFootage: 1200,
    sqft: 1200,
    price: 1800,
    bedrooms: 2,
    bathrooms: 2,
    units: 24,
    occupiedUnits: 20,
    income: 36000,
    expenses: 12000,
    pendingPayments: 3000,
    status: 'available',
    isAvailable: true,
    images: ['assets/images/millpond.jpg'],
    features: [
      'Swimming Pool',
      'Fitness Center',
      'Dog Park',
      'Resident Lounge',
      'Grilling Stations'
    ],
    unitsList: [
      {
        unitNumber: '101',
        type: 'studio',
        bedrooms: 0,
        bathrooms: 1,
        size: 600,
        rent: 1200,
        status: 'available'
      },
      {
        unitNumber: '102',
        type: '1BR',
        bedrooms: 1,
        bathrooms: 1,
        size: 800,
        rent: 1500,
        status: 'occupied'
      }
    ]
  },
  {
    name: 'Riverside Apartments',
    address: {
      street: '789 River Road',
      city: 'Minneapolis',
      state: 'MN',
      zipCode: '55401',
      country: 'USA'
    },
    description: 'Luxury riverside apartments with stunning views.',
    type: 'apartment',
    yearBuilt: 2015,
    squareFootage: 1500,
    sqft: 1500,
    price: 2200,
    bedrooms: 3,
    bathrooms: 2,
    units: 18,
    occupiedUnits: 15,
    income: 33000,
    expenses: 10000,
    pendingPayments: 2500,
    status: 'available',
    isAvailable: true,
    images: ['assets/images/riverside.jpg'],
    features: [
      'Riverside Views',
      'Modern Kitchen',
      'In-unit Laundry',
      'Balcony',
      'Covered Parking'
    ]
  }
];

// Function to seed the database
async function seedProperties() {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/tenant-management');
    console.log('Connected to MongoDB');
    
    // Delete existing properties
    await Property.deleteMany({});
    console.log('Deleted existing properties');
    
    // Insert new properties
    const seededProperties = await Property.insertMany(propertyData);
    console.log(`Seeded ${seededProperties.length} properties`);
    
    mongoose.connection.close();
    console.log('Database connection closed');
  } catch (error) {
    console.error('Error seeding database:', error);
  }
}

// Run the seeder
seedProperties(); 