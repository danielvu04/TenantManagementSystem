# Tenant Management Website - Simplified Requirements File

## 1. Introduction
### 1.1 Purpose
This document outlines the critical requirements for the Tenant Management Website, a platform designed to streamline property management tasks, including rent collection, lease agreements, maintenance tracking, and tenant communications.

### 1.2 Product Scope
The system enables landlords, tenants, and property managers to efficiently manage rental properties through a secure, cloud-based platform. It includes:
- Automated rent collection and bookkeeping
- Tenant onboarding and lease management
- Property listing and availability tracking
- Maintenance request handling
- Tenant-landlord messaging system
- Late payment notifications and reminders

## 2. System Overview
### 2.1 Architecture
- **Frontend:** Angular (hosted on AWS S3 & CloudFront)
- **Backend:** Node.js with Express.js (hosted on AWS EC2)
- **Database:** MongoDB Atlas (cloud-based NoSQL storage)
- **Authentication:** Firebase Auth (secure login system)
- **Payment Processing:** Stripe (for secure rent transactions)
- **Notifications:** Firebase Cloud Messaging (push notifications) & AWS SES (email alerts)

### 2.2 User Roles
- **Landlords:** Manage properties, leases, and payments.
- **Tenants:** View leases, submit payments, and request maintenance.
- **Property Managers:** Oversee multiple rental units.
- **System Administrators:** Ensure system security and manage user access.

## 3. Key Features
### 3.1 Tenant Registration
- **Actors:** Tenants
- **Preconditions:** Valid email and contact details required.
- **Postconditions:** Account created and verified via email.
- **Process:**
  1. Tenant registers via web portal.
  2. System validates details and sends verification email.
  3. Tenant verifies email, activating the account.

### 3.2 Landlord Registration
- **Actors:** Landlords
- **Preconditions:** Valid business information required.
- **Postconditions:** Account created, verified, and activated.
- **Process:**
  1. Landlord registers and submits business details.
  2. System validates input and sends verification email.
  3. Landlord verifies email, activating the account.

### 3.3 Property Listing Management
- **Actors:** Landlords
- **Preconditions:** Active landlord account required.
- **Postconditions:** Property listed in the system.
- **Process:**
  1. Landlord adds or modifies property details.
  2. System validates and updates the database.
  3. Listings are made available for prospective tenants.

### 3.4 Rent Payment Processing
- **Actors:** Tenants, Landlords
- **Preconditions:** Active lease agreement.
- **Postconditions:** Payment recorded, and landlord notified.
- **Process:**
  1. Tenant initiates rent payment.
  2. System processes payment securely via Stripe.
  3. Payment receipt is issued, and landlord notified.

### 3.5 Maintenance Request Handling
- **Actors:** Tenants, Landlords, Maintenance Staff
- **Preconditions:** Active lease required.
- **Postconditions:** Maintenance request logged and resolved.
- **Process:**
  1. Tenant submits a maintenance request.
  2. Landlord assigns the request to maintenance staff.
  3. Request is processed and marked as resolved.

### 3.6 Lease Agreement Generation
- **Actors:** Landlords, Tenants
- **Preconditions:** Active property listing.
- **Postconditions:** Lease agreement digitally signed and stored.
- **Process:**
  1. System generates lease agreement based on inputs.
  2. Tenant and landlord sign digitally.
  3. Lease agreement stored securely in the system.

### 3.7 Tenant Dashboard Access
- **Actors:** Tenants
- **Preconditions:** Tenant must be logged in.
- **Postconditions:** Dashboard displays lease, payment, and maintenance data.

### 3.8 Lease Renewal & Termination
- **Actors:** Landlords, Tenants
- **Preconditions:** Active lease agreement.
- **Postconditions:** Lease renewed or terminated.
- **Process:**
  1. System notifies tenant of upcoming lease expiration.
  2. Tenant submits renewal or termination request.
  3. Landlord reviews request and approves or denies.
  4. Lease status updated accordingly.

### 3.9 Tenant Communication System
- **Actors:** Tenants, Landlords
- **Preconditions:** Authenticated users only.
- **Postconditions:** Messages logged and accessible via dashboard.
- **Process:**
  1. Tenant sends message to landlord.
  2. System logs and delivers the message.
  3. Landlord responds, with conversation history stored.

### 3.10 Late Payment Handling
- **Actors:** Tenants, Landlords
- **Preconditions:** Rent payment overdue.
- **Postconditions:** Late fees applied and notifications sent.
- **Process:**
  1. System detects overdue rent payment.
  2. Automated reminders sent to tenant.
  3. Late fees applied if payment remains unpaid.
  4. Landlord receives overdue notification.

## 4. Nonfunctional Requirements
### 4.1 Performance Requirements
- System must handle 500+ concurrent users.
- Payments must process within 5 seconds.
- Page load time must not exceed 2 seconds.

### 4.2 Security Requirements
- OAuth 2.0 and Firebase security policies enforced.
- All sensitive data encrypted (in transit & at rest).
- Only authorized users can access payment and lease data.

### 4.3 Compliance and Legal Considerations
- Adherence to fair housing laws.
- PCI-DSS compliance for Stripe transactions.
- GDPR and CCPA data retention policies enforced.

## 5. Future Enhancements
- Integration with QuickBooks for bookkeeping.
- Multi-language support for global tenants and landlords.
- AI-driven rent price suggestions based on market trends.

## 6. Glossary
- **Angular:** Frontend framework for web applications.
- **Express.js:** Backend framework for API handling.
- **MongoDB Atlas:** Cloud-based NoSQL database.
- **Firebase Auth:** Secure authentication service.
- **Stripe:** Online payment processing platform.
- **AWS S3:** Storage for lease agreements and documents.
- **AWS SES:** Transactional email service.
- **Firebase Cloud Messaging:** Push notification service.

---

This document provides the essential and critical requirements for the Tenant Management Website. Future iterations will expand upon these specifications as needed.
