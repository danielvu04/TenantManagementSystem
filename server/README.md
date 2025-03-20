# Tenant Management System - Backend

This is the backend server for the Tenant Management System.

## Prerequisites

- Node.js (v14 or higher)
- MongoDB (v4.4 or higher)
- npm or yarn

## Setup

1. Install dependencies:
```bash
npm install
```

2. Create a `.env` file in the root directory with the following variables:
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/tenant-management
JWT_SECRET=your_jwt_secret_key
STRIPE_SECRET_KEY=your_stripe_secret_key
```

3. Start MongoDB:
- Windows: Start MongoDB service or run `mongod`
- macOS: `brew services start mongodb-community`
- Linux: `sudo systemctl start mongod`

## Running the Server

Development mode:
```bash
npm run dev
```

Production mode:
```bash
npm run build
npm start
```

## API Endpoints

### Users
- POST /api/users/register - Register a new user
- POST /api/users/login - Login user
- GET /api/users/profile/:id - Get user profile
- PATCH /api/users/profile/:id - Update user profile
- POST /api/users/profile/:id/change-password - Change password
- GET /api/users/users - Get all users (admin only)

### Properties
- GET /api/properties - Get all properties
- GET /api/properties/:id - Get property by ID
- POST /api/properties - Create new property (landlord only)
- GET /api/properties/landlord/properties - Get landlord's properties
- PATCH /api/properties/:id - Update property (landlord only)
- DELETE /api/properties/:id - Delete property (landlord only)

### Leases
- POST /api/leases - Create new lease (landlord only)
- GET /api/leases/landlord - Get landlord's leases
- GET /api/leases/tenant - Get tenant's leases
- GET /api/leases/:id - Get lease by ID
- PATCH /api/leases/:id - Update lease (landlord only)
- DELETE /api/leases/:id - Delete lease (landlord only)

## Error Handling

The server includes error handling middleware that will return appropriate error messages and status codes for various scenarios.

## Authentication

Most endpoints require authentication using JWT tokens. Include the token in the Authorization header:
```
Authorization: Bearer <your_jwt_token>
```

## Role-Based Access Control

The system implements role-based access control with three roles:
- tenant
- landlord
- admin

Each role has specific permissions and access levels. 