# Tenant Management System

A comprehensive web application for managing rental properties, tenants, and payments. This system combines features from Baselane (rent collection, bookkeeping, and accounting) with Resident Portal (tenant onboarding, checklist, documentation, payments, and maintenance requests).

## Features

### Property Management
- Property listing and availability tracking
- Detailed property information (amenities, pricing, specifications)
- Property status management (available, rented, maintenance)
- Image gallery for properties

### Tenant Management
- Tenant registration and onboarding
- Digital lease agreement generation and signing
- Tenant documentation management
- Tenant communication system

### Payment Processing
- Secure rent collection via Stripe
- Automated payment reminders
- Late payment handling
- Payment history tracking
- Financial reporting and bookkeeping

### Maintenance Management
- Digital maintenance request submission
- Priority-based request handling
- Maintenance status tracking
- Image upload for maintenance issues

### User Roles
- Tenant Portal
- Landlord Dashboard
- Admin Panel

## Tech Stack

### Frontend
- React with TypeScript
- Material-UI for components
- Redux for state management
- React Router for navigation

### Backend
- Node.js with Express
- TypeScript
- MongoDB with Mongoose
- JWT for authentication
- Stripe for payment processing

## Getting Started

### Prerequisites
- Node.js (v14 or higher)
- MongoDB
- Stripe account (for payment processing)

### Installation

1. Clone the repository:
```bash
git clone https://github.com/danielvu04/TenantManagementSystem.git
cd TenantManagementSystem
```

2. Install dependencies:
```bash
# Install backend dependencies
cd server
npm install

# Install frontend dependencies
cd ../client
npm install
```

3. Set up environment variables:
- Copy `.env.example` to `.env` in the server directory
- Update the environment variables with your values

4. Start the development servers:
```bash
# Start backend server
cd server
npm run dev

# Start frontend server
cd client
npm start
```

## API Documentation

### Authentication
- POST /api/users/register - Register a new user
- POST /api/users/login - Login user
- GET /api/users/profile/:id - Get user profile
- PATCH /api/users/profile/:id - Update user profile
- POST /api/users/profile/:id/change-password - Change password

### Properties
- GET /api/properties - Get all properties
- GET /api/properties/:id - Get property details
- POST /api/properties - Create new property
- PUT /api/properties/:id - Update property
- DELETE /api/properties/:id - Delete property

### Leases
- GET /api/leases - Get all leases
- POST /api/leases - Create new lease
- PUT /api/leases/:id - Update lease
- DELETE /api/leases/:id - Delete lease

### Payments
- POST /api/payments - Process payment
- GET /api/payments - Get payment history
- GET /api/payments/:id - Get payment details

### Maintenance
- POST /api/maintenance - Submit maintenance request
- GET /api/maintenance - Get maintenance requests
- PUT /api/maintenance/:id - Update maintenance request
- DELETE /api/maintenance/:id - Delete maintenance request

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Baselane for inspiration in rent collection and bookkeeping features
- Resident Portal for inspiration in tenant management features
- All contributors who help improve this project