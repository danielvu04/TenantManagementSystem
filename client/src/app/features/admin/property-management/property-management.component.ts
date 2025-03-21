import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
import { PropertyService } from '../../../core/services/property.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-property-management',
  templateUrl: './property-management.component.html',
  styleUrls: ['./property-management.component.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink]
})
export class PropertyManagementComponent implements OnInit {
  properties: any[] = [];
  isLoading = true;
  searchTerm = '';
  propertyStatusOptions = ['All', 'Available', 'Occupied', 'Maintenance'];
  selectedStatus = 'All';
  
  // Mock property data
  mockProperties = [
    {
      id: '1',
      name: 'Millpond',
      address: {
        street: '11660 Millpond Ave',
        city: 'Burnsville',
        state: 'MN',
        zipCode: '55337',
        country: 'USA'
      },
      units: 24,
      occupiedUnits: 18,
      vacancyRate: 25,
      income: 45000,
      status: 'Available',
      lastUpdated: new Date(new Date().setDate(new Date().getDate() - 5))
    },
    {
      id: '2',
      name: 'Riverside Apartments',
      address: {
        street: '789 River Road',
        city: 'Minneapolis',
        state: 'MN',
        zipCode: '55401',
        country: 'USA'
      },
      units: 18,
      occupiedUnits: 18,
      vacancyRate: 0,
      income: 42000,
      status: 'Occupied',
      lastUpdated: new Date(new Date().setDate(new Date().getDate() - 2))
    },
    {
      id: '3',
      name: 'Urban Lofts',
      address: {
        street: '456 Downtown Ave',
        city: 'St. Paul',
        state: 'MN',
        zipCode: '55102',
        country: 'USA'
      },
      units: 12,
      occupiedUnits: 10,
      vacancyRate: 16.7,
      income: 28000,
      status: 'Available',
      lastUpdated: new Date(new Date().setDate(new Date().getDate() - 7))
    },
    {
      id: '4',
      name: 'Lakeside Villas',
      address: {
        street: '222 Lake Drive',
        city: 'Wayzata',
        state: 'MN',
        zipCode: '55391',
        country: 'USA'
      },
      units: 8,
      occupiedUnits: 5,
      vacancyRate: 37.5,
      income: 32000,
      status: 'Available',
      lastUpdated: new Date(new Date().setDate(new Date().getDate() - 3))
    },
    {
      id: '5',
      name: 'Highland Homes',
      address: {
        street: '567 Summit Avenue',
        city: 'St. Paul',
        state: 'MN',
        zipCode: '55105',
        country: 'USA'
      },
      units: 1,
      occupiedUnits: 0,
      vacancyRate: 100,
      income: 0,
      status: 'Maintenance',
      lastUpdated: new Date(new Date().setDate(new Date().getDate() - 1))
    }
  ];

  constructor(
    private router: Router,
    private authService: AuthService,
    private propertyService: PropertyService
  ) { }

  ngOnInit(): void {
    // Check if user is authorized
    const isAdmin = this.authService.isAdmin();
    const isLandlord = this.authService.isLandlord();
    
    if (!isAdmin && !isLandlord) {
      this.router.navigate(['/']);
      return;
    }
    
    this.loadProperties();
  }

  loadProperties(): void {
    // In a real app, we would fetch from the API
    // this.propertyService.getAllProperties().subscribe({...})
    
    // For now, use mock data
    setTimeout(() => {
      this.properties = [...this.mockProperties];
      this.isLoading = false;
    }, 500);
  }

  getFormattedAddress(property: any): string {
    return `${property.address.street}, ${property.address.city}, ${property.address.state} ${property.address.zipCode}`;
  }

  addProperty(): void {
    this.router.navigate(['/properties/new']);
  }

  editProperty(id: string): void {
    this.router.navigate(['/properties', id, 'edit']);
  }

  viewProperty(id: string): void {
    this.router.navigate(['/properties', id]);
  }

  deleteProperty(id: string): void {
    if (confirm('Are you sure you want to delete this property? This action cannot be undone.')) {
      // In a real app, we would call the API
      // this.propertyService.deleteProperty(id).subscribe({...})
      
      // For now, just remove from the list
      this.properties = this.properties.filter(p => p.id !== id);
    }
  }

  filterProperties(): void {
    let filteredProperties = [...this.mockProperties];
    
    // Filter by search term
    if (this.searchTerm) {
      const search = this.searchTerm.toLowerCase();
      filteredProperties = filteredProperties.filter(p => 
        p.name.toLowerCase().includes(search) || 
        this.getFormattedAddress(p).toLowerCase().includes(search)
      );
    }
    
    // Filter by status
    if (this.selectedStatus !== 'All') {
      filteredProperties = filteredProperties.filter(p => 
        p.status === this.selectedStatus
      );
    }
    
    this.properties = filteredProperties;
  }

  resetFilters(): void {
    this.searchTerm = '';
    this.selectedStatus = 'All';
    this.properties = [...this.mockProperties];
  }

  getStatusClass(status: string): string {
    switch(status) {
      case 'Available': return 'status-available';
      case 'Occupied': return 'status-occupied';
      case 'Maintenance': return 'status-maintenance';
      default: return '';
    }
  }
} 