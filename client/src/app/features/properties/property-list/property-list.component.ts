import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { PropertyService } from '../../../core/services/property.service';
import { AuthService } from '../../../core/services/auth.service';
import { Property } from '../../../core/models/property.model';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';

interface PropertyFilter {
  price: { min: number | null; max: number | null };
  beds: number | null;
  baths: number | null;
  sqft: { min: number | null; max: number | null };
  location: string | null;
}

@Component({
  selector: 'app-property-list',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule],
  templateUrl: './property-list.component.html',
  styleUrl: './property-list.component.scss'
})
export class PropertyListComponent implements OnInit {
  properties: Property[] = [];
  filteredProperties: Property[] = [];
  isLoading = true;
  errorMessage = '';
  searchTerm = '';
  filter: PropertyFilter = {
    price: { min: null, max: null },
    beds: null,
    baths: null,
    sqft: { min: null, max: null },
    location: null
  };
  sortOption = 'priceAsc';
  currentPage = 1;
  totalPages = 1;
  pageSize = 9;
  isAuthenticated = false;
  
  // Default image path to use when actual images are not available
  defaultImagePath = 'assets/images/property-placeholder.jpg';

  constructor(
    private propertyService: PropertyService,
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    // Check authentication status
    this.isAuthenticated = this.authService.isAuthenticated();
    
    this.loadProperties();
    
    // Check for query parameters
    this.route.queryParams.subscribe(params => {
      if (params['search']) {
        this.searchTerm = params['search'];
      }
      
      if (params['minPrice']) {
        this.filter.price.min = Number(params['minPrice']);
      }
      
      if (params['maxPrice']) {
        this.filter.price.max = Number(params['maxPrice']);
      }
      
      if (params['beds']) {
        this.filter.beds = Number(params['beds']);
      }
      
      if (params['baths']) {
        this.filter.baths = Number(params['baths']);
      }
      
      // Apply filters if any parameters exist
      if (Object.keys(params).length > 0) {
        this.applyFilters();
      }
    });
  }

  loadProperties(): void {
    this.isLoading = true;
    
    // Create filter object from current filters
    const filters: any = {};
    if (this.searchTerm) filters.search = this.searchTerm;
    if (this.filter.price.min) filters.minPrice = this.filter.price.min;
    if (this.filter.price.max) filters.maxPrice = this.filter.price.max;
    if (this.filter.beds) filters.bedrooms = this.filter.beds;
    if (this.filter.baths) filters.bathrooms = this.filter.baths;
    if (this.filter.sqft.min) filters.minSqft = this.filter.sqft.min;
    if (this.filter.sqft.max) filters.maxSqft = this.filter.sqft.max;
    if (this.filter.location) filters.location = this.filter.location;
    
    // Add pagination
    filters.page = this.currentPage;
    filters.limit = this.pageSize;
    
    this.propertyService.getProperties(filters)
      .subscribe({
        next: (properties) => {
          this.properties = properties;
          this.filteredProperties = [...properties];
          this.totalPages = Math.ceil(this.properties.length / this.pageSize);
          this.isLoading = false;
        },
        error: (error) => {
          console.error('Error loading properties:', error);
          this.errorMessage = 'Failed to load properties. Please try again.';
          this.isLoading = false;
          
          // Fallback to mock data for development purposes
          this.loadMockProperties();
        }
      });
  }

  // Fallback method with mock data
  private loadMockProperties(): void {
    // Mock property data code as it was before...
    const mockProperties: Property[] = [
      {
        _id: '1',
        id: '1',
        name: 'Millpond',
        address: {
          street: '11660 Millpond Ave',
          city: 'Burnsville',
          state: 'MN',
          zipCode: '55337',
          country: 'USA'
        },
        description: 'Modern apartments with spacious floor plans and luxury amenities.',
        price: 1800,
        bedrooms: 2,
        bathrooms: 2,
        sqft: 1200,
        isAvailable: true,
        status: 'available',
        type: 'apartment',
        images: ['assets/images/millpond.jpg'],
        createdAt: new Date(),
        updatedAt: new Date(),
        units: 24,
        unitsList: [],
        features: [
          'Swimming Pool',
          'Fitness Center',
          'Dog Park',
          'Resident Lounge',
          'Grilling Stations'
        ],
        yearBuilt: 2010,
        squareFootage: 1200,
        occupiedUnits: 20,
        income: 36000,
        expenses: 12000,
        pendingPayments: 3000
      },
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
        price: 2200,
        bedrooms: 3,
        bathrooms: 2,
        sqft: 1500,
        isAvailable: true,
        status: 'available',
        type: 'apartment',
        images: ['assets/images/riverside.jpg'],
        createdAt: new Date(),
        updatedAt: new Date(),
        units: 18,
        unitsList: [],
        features: [
          'Riverside Views',
          'Modern Kitchen',
          'In-unit Laundry',
          'Balcony',
          'Covered Parking'
        ],
        yearBuilt: 2015,
        squareFootage: 1500,
        occupiedUnits: 15,
        income: 33000,
        expenses: 10000,
        pendingPayments: 2500
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
        price: 1950,
        bedrooms: 1,
        bathrooms: 1,
        sqft: 950,
        isAvailable: true,
        status: 'available',
        type: 'loft',
        images: ['assets/images/urban-lofts.jpg'],
        createdAt: new Date(),
        updatedAt: new Date(),
        units: 12,
        unitsList: [],
        features: [
          'High Ceilings',
          'Exposed Brick',
          'Hardwood Floors',
          'Stainless Steel Appliances',
          'Rooftop Access'
        ],
        yearBuilt: 2008,
        squareFootage: 950,
        occupiedUnits: 10,
        income: 19500,
        expenses: 7000,
        pendingPayments: 1950
      },
      {
        _id: '4',
        id: '4',
        name: 'Lakeside Villas',
        address: {
          street: '222 Lake Drive',
          city: 'Wayzata',
          state: 'MN',
          zipCode: '55391',
          country: 'USA'
        },
        description: 'Upscale villas with private lake access and exceptional amenities.',
        price: 3500,
        bedrooms: 4,
        bathrooms: 3,
        sqft: 2800,
        isAvailable: true,
        status: 'available',
        type: 'villa',
        images: ['assets/images/lakeside.jpg'],
        createdAt: new Date(),
        updatedAt: new Date(),
        units: 8,
        unitsList: [],
        features: [
          'Lake Access',
          'Private Dock',
          'Gourmet Kitchen',
          'Home Theater',
          'Three-car Garage'
        ],
        yearBuilt: 2018,
        squareFootage: 2800,
        occupiedUnits: 6,
        income: 21000,
        expenses: 7500,
        pendingPayments: 3500
      },
      {
        _id: '5',
        id: '5',
        name: 'Highland Homes',
        address: {
          street: '567 Summit Avenue',
          city: 'St. Paul',
          state: 'MN',
          zipCode: '55105',
          country: 'USA'
        },
        description: 'Classic homes in the historic Highland Park neighborhood.',
        price: 2800,
        bedrooms: 3,
        bathrooms: 2.5,
        sqft: 2200,
        isAvailable: true,
        status: 'available',
        type: 'house',
        images: ['assets/images/highland.jpg'],
        createdAt: new Date(),
        updatedAt: new Date(),
        units: 1,
        unitsList: [],
        features: [
          'Historic Architecture',
          'Renovated Interior', 
          'Hardwood Floors',
          'Fenced Backyard',
          'Two-car Garage'
        ],
        yearBuilt: 1920,
        squareFootage: 2200,
        occupiedUnits: 0,
        income: 2800,
        expenses: 800,
        pendingPayments: 0,
        monthlyRoi: 8.5
      }
    ];
    
    this.properties = mockProperties;
    this.filteredProperties = [...mockProperties];
    this.totalPages = Math.ceil(this.properties.length / this.pageSize);
  }

  applyFilters(): void {
    this.filteredProperties = this.properties.filter(property => {
      // Search term filter
      const matchesSearch = !this.searchTerm || 
        property.name.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        property.description.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        property.address.city.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        property.address.state.toLowerCase().includes(this.searchTerm.toLowerCase());
      
      // Price range filter
      const matchesPrice = 
        (!this.filter.price.min || (property.price ?? 0) >= this.filter.price.min) && 
        (!this.filter.price.max || (property.price ?? 0) <= this.filter.price.max);
      // Bedrooms filter
      const matchesBeds = !this.filter.beds || (property.bedrooms ?? 0) >= this.filter.beds;
      // Bathrooms filter
      const matchesBaths = !this.filter.baths || (property.bathrooms ?? 0) >= this.filter.baths;
      
      // Square footage filter
      const matchesSqft = 
        (!this.filter.sqft.min || (property.sqft ?? 0) >= this.filter.sqft.min) && 
        (!this.filter.sqft.max || (property.sqft ?? 0) <= this.filter.sqft.max);
      
      return matchesSearch && matchesPrice && matchesBeds && matchesBaths && matchesSqft;
    });
    
    this.sortProperties();
    this.totalPages = Math.ceil(this.filteredProperties.length / this.pageSize);
    this.currentPage = 1;
  }

  sortProperties(): void {
    switch (this.sortOption) {
      case 'priceAsc':
        this.filteredProperties.sort((a, b) => (a.price ?? 0) - (b.price ?? 0));
        break;
      case 'priceDesc':
        this.filteredProperties.sort((a, b) => (b.price ?? 0) - (a.price ?? 0));
        break;
      case 'bedsDesc':
        this.filteredProperties.sort((a, b) => (b.bedrooms ?? 0) - (a.bedrooms ?? 0));
        break;
      case 'sqftDesc':
        this.filteredProperties.sort((a, b) => (b.sqft ?? 0) - (a.sqft ?? 0));
        break;
    }
  }

  searchProperties(): void {
    this.applyFilters();
  }

  resetFilters(): void {
    this.filter = {
      price: { min: null, max: null },
      beds: null,
      baths: null,
      sqft: { min: null, max: null },
      location: null
    };
    this.searchTerm = '';
    this.filteredProperties = [...this.properties];
    this.totalPages = Math.ceil(this.properties.length / this.pageSize);
    this.currentPage = 1;
  }

  getFormattedAddress(property: Property): string {
    return `${property.address.street}, ${property.address.city}, ${property.address.state} ${property.address.zipCode}`;
  }

  getPropertyBedsLabel(property: Property): string {
    if (!property) return '';
    return `${property.bedrooms} Bed${property.bedrooms !== 1 ? 's' : ''}`;
  }

  getPropertyBathsLabel(property: Property): string {
    if (!property) return '';
    return `${property.bathrooms} Bath${property.bathrooms !== 1 ? 's' : ''}`;
  }

  getPropertySqftLabel(property: Property): string {
    if (!property) return '';
    return `${property.sqft} sqft`;
  }

  getPropertyPriceLabel(property: Property): string {
    if (!property) return '';
    return `$${property.price}/month`;
  }

  scheduleTour(property: Property): void {
    // Implementation will be added when we have the backend
    alert(`Tour scheduled for ${property.name}`);
  }

  contactAgent(): void {
    // Implementation will be added when we have the backend
    alert('An agent will contact you shortly');
  }

  getPropertyImageUrl(property: Property | undefined): string {
    if (!property || !property.images || property.images.length === 0) {
      return this.defaultImagePath;
    }
    return property.images[0];
  }

  changePage(page: number): void {
    if (page < 1 || page > this.totalPages) {
      return;
    }
    this.currentPage = page;
  }

  getPageNumbers(): number[] {
    const pages: number[] = [];
    for (let i = 1; i <= this.totalPages; i++) {
      pages.push(i);
    }
    return pages;
  }
}
