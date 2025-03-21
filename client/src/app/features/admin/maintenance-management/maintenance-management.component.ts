import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-maintenance-management',
  templateUrl: './maintenance-management.component.html',
  styleUrls: ['./maintenance-management.component.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink]
})
export class MaintenanceManagementComponent implements OnInit {
  maintenanceRequests: any[] = [];
  isLoading = true;
  searchTerm = '';
  statusOptions = ['All', 'Open', 'In Progress', 'Completed', 'Cancelled'];
  selectedStatus = 'All';
  selectedProperty = 'All';
  properties: any[] = [];

  // Mock data for maintenance requests
  mockMaintenanceRequests = [
    {
      id: 1,
      title: 'Leaking Faucet',
      description: 'Kitchen sink faucet is leaking consistently.',
      propertyId: 1,
      propertyName: 'Riverside Apartments',
      unitNumber: '101',
      tenantName: 'John Doe',
      priority: 'Medium',
      status: 'Open',
      dateSubmitted: new Date(2025, 2, 10),
      dateUpdated: new Date(2025, 2, 10),
      assignedTo: 'Mike Smith'
    },
    {
      id: 2,
      title: 'Broken Heater',
      description: 'Heater not turning on in living room.',
      propertyId: 1,
      propertyName: 'Riverside Apartments',
      unitNumber: '205',
      tenantName: 'Sarah Johnson',
      priority: 'High',
      status: 'In Progress',
      dateSubmitted: new Date(2025, 2, 5),
      dateUpdated: new Date(2025, 2, 8),
      assignedTo: 'Robert Jones'
    },
    {
      id: 3,
      title: 'Electrical Outlet Not Working',
      description: 'Outlet in bedroom doesn\'t work.',
      propertyId: 2,
      propertyName: 'Sunset Condos',
      unitNumber: '301',
      tenantName: 'Michael Williams',
      priority: 'Low',
      status: 'Completed',
      dateSubmitted: new Date(2025, 1, 28),
      dateUpdated: new Date(2025, 2, 7),
      assignedTo: 'Emma Davis'
    },
    {
      id: 4,
      title: 'Window Won\'t Close',
      description: 'Bedroom window won\'t shut properly, letting in cold air.',
      propertyId: 3,
      propertyName: 'Urban Lofts',
      unitNumber: '402',
      tenantName: 'Lisa Brown',
      priority: 'Medium',
      status: 'Open',
      dateSubmitted: new Date(2025, 2, 12),
      dateUpdated: new Date(2025, 2, 12),
      assignedTo: 'Unassigned'
    },
    {
      id: 5,
      title: 'Clogged Toilet',
      description: 'Bathroom toilet is clogged and won\'t flush.',
      propertyId: 4,
      propertyName: 'Harbor View',
      unitNumber: '105',
      tenantName: 'David Miller',
      priority: 'High',
      status: 'In Progress',
      dateSubmitted: new Date(2025, 2, 11),
      dateUpdated: new Date(2025, 2, 12),
      assignedTo: 'Mike Smith'
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

    // Load maintenance requests (using mock data for now)
    this.loadMaintenanceRequests();
    
    // Load properties for filtering
    this.properties = this.mockProperties;
  }

  loadMaintenanceRequests(): void {
    // Simulate API call
    setTimeout(() => {
      this.maintenanceRequests = this.mockMaintenanceRequests;
      this.isLoading = false;
    }, 1000);
  }

  addMaintenanceRequest(): void {
    this.router.navigate(['/admin/maintenance/new']);
  }

  viewMaintenanceRequest(id: number): void {
    this.router.navigate([`/admin/maintenance/${id}`]);
  }

  updateStatus(request: any, newStatus: string): void {
    // Update request status (would be an API call in real implementation)
    request.status = newStatus;
    request.dateUpdated = new Date();
    console.log(`Updated request ${request.id} status to ${newStatus}`);
  }

  assignMaintenance(request: any): void {
    // Show assignment dialog (placeholder for now)
    console.log(`Assign request ${request.id}`);
  }

  filterRequests(): void {
    this.isLoading = true;
    
    // Simulate API call with filters
    setTimeout(() => {
      let filtered = this.mockMaintenanceRequests;
      
      if (this.searchTerm) {
        const search = this.searchTerm.toLowerCase();
        filtered = filtered.filter(request => 
          request.title.toLowerCase().includes(search) ||
          request.description.toLowerCase().includes(search) ||
          request.tenantName.toLowerCase().includes(search) ||
          request.unitNumber.toLowerCase().includes(search)
        );
      }
      
      if (this.selectedStatus !== 'All') {
        filtered = filtered.filter(request => request.status === this.selectedStatus);
      }
      
      if (this.selectedProperty !== 'All') {
        filtered = filtered.filter(request => request.propertyName === this.selectedProperty);
      }
      
      this.maintenanceRequests = filtered;
      this.isLoading = false;
    }, 500);
  }

  resetFilters(): void {
    this.searchTerm = '';
    this.selectedStatus = 'All';
    this.selectedProperty = 'All';
    this.loadMaintenanceRequests();
  }

  // Helper method to get priority class for styling
  getPriorityClass(priority: string): string {
    switch (priority.toLowerCase()) {
      case 'high': return 'priority-high';
      case 'medium': return 'priority-medium';
      case 'low': return 'priority-low';
      default: return '';
    }
  }

  // Helper method to get status class for styling
  getStatusClass(status: string): string {
    switch (status.toLowerCase()) {
      case 'open': return 'status-open';
      case 'in progress': return 'status-in-progress';
      case 'completed': return 'status-completed';
      case 'cancelled': return 'status-cancelled';
      default: return '';
    }
  }
} 