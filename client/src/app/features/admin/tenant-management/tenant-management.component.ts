import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-tenant-management',
  templateUrl: './tenant-management.component.html',
  styleUrls: ['./tenant-management.component.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink]
})
export class TenantManagementComponent implements OnInit {
  tenants: any[] = [];
  isLoading = true;
  searchTerm = '';
  statusOptions = ['All', 'Active', 'Pending', 'Former'];
  selectedStatus = 'All';
  propertyFilter = 'All';
  properties: any[] = [];
  
  // Mock tenant data
  mockTenants = [
    {
      id: '1',
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@example.com',
      phone: '(555) 123-4567',
      propertyName: 'Millpond',
      propertyId: '1',
      unitNumber: '101',
      leaseStart: new Date('2023-01-01'),
      leaseEnd: new Date('2023-12-31'),
      status: 'Active',
      rentAmount: 1200,
      lastPayment: new Date('2023-04-01')
    },
    {
      id: '2',
      firstName: 'Jane',
      lastName: 'Smith',
      email: 'jane.smith@example.com',
      phone: '(555) 987-6543',
      propertyName: 'Millpond',
      propertyId: '1',
      unitNumber: '205',
      leaseStart: new Date('2022-08-15'),
      leaseEnd: new Date('2023-08-14'),
      status: 'Active',
      rentAmount: 1400,
      lastPayment: new Date('2023-04-02')
    },
    {
      id: '3',
      firstName: 'Michael',
      lastName: 'Johnson',
      email: 'michael.j@example.com',
      phone: '(555) 456-7890',
      propertyName: 'Riverside Apartments',
      propertyId: '2',
      unitNumber: '304',
      leaseStart: new Date('2023-03-01'),
      leaseEnd: new Date('2024-02-29'),
      status: 'Active',
      rentAmount: 1600,
      lastPayment: new Date('2023-04-01')
    },
    {
      id: '4',
      firstName: 'Sarah',
      lastName: 'Williams',
      email: 'sarah.w@example.com',
      phone: '(555) 234-5678',
      propertyName: 'Urban Lofts',
      propertyId: '3',
      unitNumber: '201',
      leaseStart: new Date('2023-05-01'),
      leaseEnd: null,
      status: 'Pending',
      rentAmount: 1800,
      lastPayment: null
    },
    {
      id: '5',
      firstName: 'Robert',
      lastName: 'Brown',
      email: 'robert.b@example.com',
      phone: '(555) 876-5432',
      propertyName: 'Lakeside Villas',
      propertyId: '4',
      unitNumber: '102',
      leaseStart: new Date('2022-06-15'),
      leaseEnd: new Date('2023-03-15'),
      status: 'Former',
      rentAmount: 2200,
      lastPayment: new Date('2023-03-01')
    }
  ];
  
  // Mock property data for filter
  mockProperties = [
    { id: '1', name: 'Millpond' },
    { id: '2', name: 'Riverside Apartments' },
    { id: '3', name: 'Urban Lofts' },
    { id: '4', name: 'Lakeside Villas' },
    { id: '5', name: 'Highland Homes' }
  ];

  constructor(
    private router: Router,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    // Check if user is authorized
    const isAdmin = this.authService.isAdmin();
    const isLandlord = this.authService.isLandlord();
    
    if (!isAdmin && !isLandlord) {
      this.router.navigate(['/']);
      return;
    }
    
    this.loadTenants();
    this.properties = [...this.mockProperties];
  }

  loadTenants(): void {
    // In a real app, we would fetch from the API
    
    // For now, use mock data
    setTimeout(() => {
      this.tenants = [...this.mockTenants];
      this.isLoading = false;
    }, 500);
  }

  getFullName(tenant: any): string {
    return `${tenant.firstName} ${tenant.lastName}`;
  }

  addTenant(): void {
    this.router.navigate(['/tenants/new']);
  }

  editTenant(id: string): void {
    this.router.navigate(['/tenants', id, 'edit']);
  }

  viewTenant(id: string): void {
    this.router.navigate(['/tenants', id]);
  }

  filterTenants(): void {
    let filteredTenants = [...this.mockTenants];
    
    // Filter by search term
    if (this.searchTerm) {
      const search = this.searchTerm.toLowerCase();
      filteredTenants = filteredTenants.filter(t => 
        t.firstName.toLowerCase().includes(search) || 
        t.lastName.toLowerCase().includes(search) ||
        t.email.toLowerCase().includes(search) ||
        t.phone.includes(search) ||
        t.unitNumber.toLowerCase().includes(search)
      );
    }
    
    // Filter by status
    if (this.selectedStatus !== 'All') {
      filteredTenants = filteredTenants.filter(t => 
        t.status === this.selectedStatus
      );
    }
    
    // Filter by property
    if (this.propertyFilter !== 'All') {
      filteredTenants = filteredTenants.filter(t => 
        t.propertyId === this.propertyFilter
      );
    }
    
    this.tenants = filteredTenants;
  }

  resetFilters(): void {
    this.searchTerm = '';
    this.selectedStatus = 'All';
    this.propertyFilter = 'All';
    this.tenants = [...this.mockTenants];
  }

  getStatusClass(status: string): string {
    switch(status) {
      case 'Active': return 'status-active';
      case 'Pending': return 'status-pending';
      case 'Former': return 'status-former';
      default: return '';
    }
  }

  hasActiveLeases(tenant: any): boolean {
    if (!tenant.leaseEnd) return false;
    return new Date(tenant.leaseEnd) > new Date();
  }

  getLeaseTimeRemaining(tenant: any): string {
    if (!tenant.leaseEnd) return 'No active lease';
    
    const today = new Date();
    const leaseEnd = new Date(tenant.leaseEnd);
    
    if (leaseEnd < today) {
      return 'Lease expired';
    }
    
    const diff = leaseEnd.getTime() - today.getTime();
    const days = Math.ceil(diff / (1000 * 60 * 60 * 24));
    
    if (days > 30) {
      const months = Math.floor(days / 30);
      return `${months} month${months > 1 ? 's' : ''} remaining`;
    }
    
    return `${days} day${days > 1 ? 's' : ''} remaining`;
  }
} 