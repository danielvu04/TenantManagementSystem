import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-payment-management',
  templateUrl: './payment-management.component.html',
  styleUrls: ['./payment-management.component.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink]
})
export class PaymentManagementComponent implements OnInit {
  payments: any[] = [];
  isLoading = true;
  searchTerm = '';
  statusOptions = ['All', 'Paid', 'Pending', 'Overdue', 'Refunded'];
  selectedStatus = 'All';
  selectedProperty = 'All';
  properties: any[] = [];

  // Mock data for payments
  mockPayments = [
    {
      id: 1,
      tenantName: 'John Doe',
      tenantId: 1,
      propertyName: 'Riverside Apartments',
      propertyId: 1,
      unitNumber: '101',
      amount: 1200,
      dueDate: new Date(2025, 2, 1),
      paymentDate: new Date(2025, 2, 1),
      status: 'Paid',
      paymentMethod: 'Credit Card',
      reference: 'INV-2025-001'
    },
    {
      id: 2,
      tenantName: 'Sarah Johnson',
      tenantId: 2,
      propertyName: 'Riverside Apartments',
      propertyId: 1,
      unitNumber: '205',
      amount: 1400,
      dueDate: new Date(2025, 2, 1),
      paymentDate: new Date(2025, 2, 2),
      status: 'Paid',
      paymentMethod: 'Bank Transfer',
      reference: 'INV-2025-002'
    },
    {
      id: 3,
      tenantName: 'Michael Williams',
      tenantId: 3,
      propertyName: 'Sunset Condos',
      propertyId: 2,
      unitNumber: '301',
      amount: 1600,
      dueDate: new Date(2025, 2, 1),
      paymentDate: null,
      status: 'Overdue',
      paymentMethod: null,
      reference: 'INV-2025-003'
    },
    {
      id: 4,
      tenantName: 'Lisa Brown',
      tenantId: 4,
      propertyName: 'Urban Lofts',
      propertyId: 3,
      unitNumber: '402',
      amount: 1800,
      dueDate: new Date(2025, 3, 1),
      paymentDate: null,
      status: 'Pending',
      paymentMethod: null,
      reference: 'INV-2025-004'
    },
    {
      id: 5,
      tenantName: 'David Miller',
      tenantId: 5,
      propertyName: 'Harbor View',
      propertyId: 4,
      unitNumber: '105',
      amount: 2200,
      dueDate: new Date(2025, 2, 1),
      paymentDate: new Date(2025, 2, 10),
      status: 'Paid',
      paymentMethod: 'PayPal',
      reference: 'INV-2025-005'
    }
  ];

  // Mock data for properties
  mockProperties = [
    { id: 1, name: 'Riverside Apartments' },
    { id: 2, name: 'Sunset Condos' },
    { id: 3, name: 'Urban Lofts' },
    { id: 4, name: 'Harbor View' },
    { id: 5, name: 'Mountain Retreat' }
  ];

  constructor(
    private router: Router,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    // Check if user is authorized
    if (!this.authService.isLandlord() && !this.authService.isAdmin()) {
      this.router.navigate(['/']);
      return;
    }

    // Load payments (using mock data for now)
    this.loadPayments();
    
    // Load properties for filtering
    this.properties = this.mockProperties;
  }

  loadPayments(): void {
    // Simulate API call
    setTimeout(() => {
      this.payments = this.mockPayments;
      this.isLoading = false;
    }, 1000);
  }

  recordPayment(): void {
    this.router.navigate(['/admin/payments/new']);
  }

  viewPayment(id: number): void {
    this.router.navigate([`/admin/payments/${id}`]);
  }

  sendReminder(payment: any): void {
    // Send payment reminder (would be an API call in real implementation)
    console.log(`Sending reminder for payment ${payment.id} to ${payment.tenantName}`);
    alert(`Payment reminder sent to ${payment.tenantName}`);
  }

  markAsPaid(payment: any): void {
    // Mark payment as paid (would be an API call in real implementation)
    payment.status = 'Paid';
    payment.paymentDate = new Date();
    payment.paymentMethod = 'Manual Entry';
    console.log(`Marked payment ${payment.id} as paid`);
  }

  filterPayments(): void {
    this.isLoading = true;
    
    // Simulate API call with filters
    setTimeout(() => {
      let filtered = this.mockPayments;
      
      if (this.searchTerm) {
        const search = this.searchTerm.toLowerCase();
        filtered = filtered.filter(payment => 
          payment.tenantName.toLowerCase().includes(search) ||
          payment.reference.toLowerCase().includes(search) ||
          payment.unitNumber.toLowerCase().includes(search)
        );
      }
      
      if (this.selectedStatus !== 'All') {
        filtered = filtered.filter(payment => payment.status === this.selectedStatus);
      }
      
      if (this.selectedProperty !== 'All') {
        filtered = filtered.filter(payment => payment.propertyName === this.selectedProperty);
      }
      
      this.payments = filtered;
      this.isLoading = false;
    }, 500);
  }

  resetFilters(): void {
    this.searchTerm = '';
    this.selectedStatus = 'All';
    this.selectedProperty = 'All';
    this.loadPayments();
  }

  // Helper method to get status class for styling
  getStatusClass(status: string): string {
    switch (status.toLowerCase()) {
      case 'paid': return 'status-paid';
      case 'pending': return 'status-pending';
      case 'overdue': return 'status-overdue';
      case 'refunded': return 'status-refunded';
      default: return '';
    }
  }

  // Helper method to format date
  formatDate(date: Date | null): string {
    if (!date) return 'Not yet paid';
    return new Date(date).toLocaleDateString();
  }

  // Helper method to check if payment is overdue
  isOverdue(payment: any): boolean {
    if (payment.status === 'Paid') return false;
    const today = new Date();
    const dueDate = new Date(payment.dueDate);
    return dueDate < today;
  }
} 