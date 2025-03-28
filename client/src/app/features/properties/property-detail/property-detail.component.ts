import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { PropertyService } from '../../../core/services/property.service';
import { AuthService } from '../../../core/services/auth.service';

interface PropertyUnit {
  id: string;
  unitNumber: string;
  type: string;
  bedrooms: number;
  bathrooms: number;
  size: number;
  rent: number;
  status: string;
}

interface Tenant {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  unitNumber: string;
  leaseId: string;
  leaseStart: Date;
  leaseEnd: Date;
}

interface MaintenanceRequest {
  id: string;
  title: string;
  description: string;
  unitNumber: string;
  dateSubmitted: Date;
  priority: 'low' | 'medium' | 'high';
  status: string;
}

interface Property {
  _id: string;
  id?: string;
  name: string;
  address: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  };
  description: string;
  type?: string;
  yearBuilt?: number;
  squareFootage?: number;
  sqft?: number;
  price?: number;
  bedrooms?: number;
  bathrooms?: number;
  units: number;
  occupiedUnits: number;
  income: number;
  expenses: number;
  pendingPayments: number;
  status: 'available' | 'occupied' | 'maintenance' | 'active' | 'inactive';
  images: string[];
  features?: string[];
  unitsList?: PropertyUnit[];
  tenants?: Tenant[];
  maintenanceRequests?: MaintenanceRequest[];
  agent?: {
    name: string;
    email: string;
    phone: string;
    image: string;
  };
}

@Component({
  selector: 'app-property-detail',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './property-detail.component.html',
  styleUrl: './property-detail.component.scss'
})
export class PropertyDetailComponent implements OnInit {
  property: Property | null = null;
  loading = true;
  error = '';
  isLandlord = false;
  selectedImage = '';
  selectedImageIndex = 0;
  isAuthenticated = false;
  propertyId = '';
  sampleProperties: Property[] = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private propertyService: PropertyService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.isLandlord = this.authService.isLandlord();
    this.loadProperty();
    
    // Check authentication status
    this.isAuthenticated = this.authService.isAuthenticated();
    
    // Setup sample properties for the "Similar Properties" section
    this.setupSampleProperties();
  }

  loadProperty(): void {
    this.loading = true;
    const id = this.route.snapshot.paramMap.get('id');

    if (!id) {
      this.error = 'Invalid property ID';
      this.loading = false;
      return;
    }

    this.propertyService.getPropertyById(id)
      .subscribe({
        next: (response) => {
          // In a real application, this would come from the API
          // For now, we're using mock data
          this.property = this.getMockProperty();
          this.selectedImage = this.property.images[0] || '';
          this.selectedImageIndex = 0;
          this.loading = false;
        },
        error: (err) => {
          this.error = 'Failed to load property details. Please try again later.';
          this.loading = false;
          console.error('Error loading property', err);
        }
      });
  }

  selectImage(index: number): void {
    if (this.property && this.property.images && this.property.images[index]) {
      this.selectedImage = this.property.images[index];
      this.selectedImageIndex = index;
    }
  }

  editProperty(): void {
    if (this.property) {
      this.router.navigate(['/properties', this.property._id, 'edit']);
    }
  }

  confirmDelete(): void {
    if (confirm('Are you sure you want to delete this property? This action cannot be undone.')) {
      this.deleteProperty();
    }
  }

  deleteProperty(): void {
    if (!this.property) return;

    this.propertyService.deleteProperty(this.property._id)
      .subscribe({
        next: () => {
          // Navigate back to the properties list
          this.router.navigate(['/properties']);
        },
        error: (err) => {
          this.error = 'Failed to delete property. Please try again later.';
          console.error('Error deleting property', err);
        }
      });
  }

  addUnit(): void {
    if (this.property) {
      this.router.navigate(['/properties', this.property._id, 'units', 'add']);
    }
  }

  viewUnit(unitId: string): void {
    if (this.property) {
      this.router.navigate(['/properties', this.property._id, 'units', unitId]);
    }
  }

  editUnit(unitId: string): void {
    if (this.property) {
      this.router.navigate(['/properties', this.property._id, 'units', unitId, 'edit']);
    }
  }

  addTenant(): void {
    if (this.property) {
      this.router.navigate(['/properties', this.property._id, 'tenants', 'add']);
    }
  }

  viewTenant(tenantId: string): void {
    this.router.navigate(['/tenants', tenantId]);
  }

  viewLease(leaseId: string): void {
    this.router.navigate(['/leases', leaseId]);
  }

  createMaintenanceRequest(): void {
    if (this.property) {
      this.router.navigate(['/maintenance/new'], { 
        queryParams: { propertyId: this.property._id } 
      });
    }
  }

  viewMaintenanceRequest(requestId: string): void {
    this.router.navigate(['/maintenance', requestId]);
  }

  viewFinancialReports(): void {
    if (this.property) {
      this.router.navigate(['/properties', this.property._id, 'finances']);
    }
  }

  getMainImage(): string {
    return this.property?.images[0] || '';
  }

  scheduleViewing(): void {
    if (!this.isAuthenticated) {
      this.router.navigate(['/auth/login'], { 
        queryParams: { returnUrl: this.router.url, action: 'schedule' }
      });
      return;
    }
    
    alert('Scheduling feature will be implemented in a future update.');
    // In a real application, this would open a form or navigate to a booking page
  }

  contactAgent(): void {
    if (!this.isAuthenticated) {
      this.router.navigate(['/auth/login'], { 
        queryParams: { returnUrl: this.router.url, action: 'contact' }
      });
      return;
    }
    
    alert('Contact feature will be implemented in a future update.');
    // In a real application, this would open a contact form or chat interface
  }

  setupSampleProperties(): void {
    this.sampleProperties = [
      {
        _id: '2',
        id: '2',
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
        yearBuilt: 2018,
        squareFootage: 10000,
        sqft: 1500,
        price: 2200,
        bedrooms: 3,
        bathrooms: 2,
        units: 18,
        occupiedUnits: 15,
        income: 30000,
        expenses: 12000,
        pendingPayments: 1500,
        status: 'available',
        images: ['https://via.placeholder.com/600x400'],
        features: [
          'Riverside Views',
          'Modern Kitchen',
          'In-unit Laundry',
          'Balcony',
          'Covered Parking'
        ]
      },
      {
        _id: '3',
        id: '3',
        name: 'Urban Lofts',
        address: {
          street: '456 Downtown Ave',
          city: 'St. Paul',
          state: 'MN',
          zipCode: '55102',
          country: 'USA'
        },
        description: 'Contemporary lofts in the heart of downtown.',
        type: 'loft',
        yearBuilt: 2015,
        squareFootage: 8000,
        sqft: 950,
        price: 1950,
        bedrooms: 1,
        bathrooms: 1,
        units: 12,
        occupiedUnits: 10,
        income: 20000,
        expenses: 8000,
        pendingPayments: 1000,
        status: 'available',
        images: ['https://via.placeholder.com/600x400'],
        features: [
          'High Ceilings',
          'Exposed Brick',
          'Hardwood Floors',
          'Stainless Steel Appliances',
          'Rooftop Access'
        ]
      }
    ];
  }

  // Update the mock property
  private getMockProperty(): Property {
    this.propertyId = '1';
    return {
      _id: '1',
      id: '1',
      name: 'Oakwood Apartments',
      address: {
        street: '123 Main Street',
        city: 'Anytown',
        state: 'CA',
        zipCode: '90210',
        country: 'USA'
      },
      description: 'A beautiful apartment complex with modern amenities including a pool, gym, and community center. Located in a quiet neighborhood with easy access to public transportation, shopping, and dining.',
      type: 'Apartment Complex',
      yearBuilt: 2015,
      squareFootage: 12000,
      sqft: 1200,
      price: 1800,
      bedrooms: 2,
      bathrooms: 2,
      units: 5,
      occupiedUnits: 3,
      income: 5500,
      expenses: 2200,
      pendingPayments: 500,
      status: 'available',
      images: ['https://via.placeholder.com/600x400', 'https://via.placeholder.com/600x400', 'https://via.placeholder.com/600x400'],
      features: [
        'Swimming Pool',
        'Fitness Center',
        'Dog Park',
        'Resident Lounge',
        'Grilling Stations',
        'Secure Access',
        'In-unit Washer/Dryer'
      ],
      agent: {
        name: 'John Smith',
        email: 'john.smith@example.com',
        phone: '(555) 123-4567',
        image: 'https://via.placeholder.com/100x100'
      },
      unitsList: [
        {
          id: 'unit1',
          unitNumber: '101',
          type: 'Studio',
          bedrooms: 0,
          bathrooms: 1,
          size: 500,
          rent: 800,
          status: 'occupied'
        },
        {
          id: 'unit2',
          unitNumber: '102',
          type: '1 Bedroom',
          bedrooms: 1,
          bathrooms: 1,
          size: 650,
          rent: 1000,
          status: 'available'
        },
        {
          id: 'unit3',
          unitNumber: '201',
          type: '2 Bedroom',
          bedrooms: 2,
          bathrooms: 2,
          size: 900,
          rent: 1500,
          status: 'occupied'
        },
        {
          id: 'unit4',
          unitNumber: '202',
          type: '2 Bedroom',
          bedrooms: 2,
          bathrooms: 2,
          size: 950,
          rent: 1600,
          status: 'maintenance'
        },
        {
          id: 'unit5',
          unitNumber: '301',
          type: '3 Bedroom',
          bedrooms: 3,
          bathrooms: 2,
          size: 1200,
          rent: 2000,
          status: 'occupied'
        }
      ],
      tenants: [
        {
          id: 'tenant1',
          firstName: 'John',
          lastName: 'Doe',
          email: 'john.doe@example.com',
          phone: '555-123-4567',
          unitNumber: '101',
          leaseId: 'lease1',
          leaseStart: new Date('2023-01-01'),
          leaseEnd: new Date('2023-12-31')
        },
        {
          id: 'tenant2',
          firstName: 'Jane',
          lastName: 'Smith',
          email: 'jane.smith@example.com',
          phone: '555-987-6543',
          unitNumber: '201',
          leaseId: 'lease2',
          leaseStart: new Date('2023-03-15'),
          leaseEnd: new Date('2024-03-14')
        },
        {
          id: 'tenant3',
          firstName: 'Michael',
          lastName: 'Johnson',
          email: 'michael.johnson@example.com',
          phone: '555-456-7890',
          unitNumber: '301',
          leaseId: 'lease3',
          leaseStart: new Date('2022-11-01'),
          leaseEnd: new Date('2023-10-31')
        }
      ],
      maintenanceRequests: [
        {
          id: 'request1',
          title: 'Leaking faucet',
          description: 'The bathroom sink faucet is leaking and needs to be fixed.',
          unitNumber: '201',
          dateSubmitted: new Date('2023-05-10'),
          priority: 'low',
          status: 'pending'
        },
        {
          id: 'request2',
          title: 'Broken AC',
          description: 'The air conditioner stopped working and the unit is getting very hot.',
          unitNumber: '202',
          dateSubmitted: new Date('2023-05-15'),
          priority: 'high',
          status: 'in progress'
        },
        {
          id: 'request3',
          title: 'Light fixture replacement',
          description: 'The living room light fixture needs to be replaced.',
          unitNumber: '301',
          dateSubmitted: new Date('2023-05-05'),
          priority: 'medium',
          status: 'completed'
        }
      ]
    };
  }
}
