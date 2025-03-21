import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
import { User } from '../../../core/models/user.model';
import { Subscription } from 'rxjs';
import { FormsModule } from '@angular/forms';

interface Property {
  id: number;
  _id?: string;
  name: string;
  address: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  };
  description: string;
  price: { min: number; max: number };
  beds: { min: number; max: number };
  baths: { min: number; max: number };
  sqft: { min: number; max: number };
  status: string;
  image: string;
  amenities: string[];
  featured: boolean;
}

interface PropertyFilter {
  price: { min: number | null; max: number | null };
  beds: number | null;
  baths: number | null;
  sqft: { min: number | null; max: number | null };
  location: string | null;
}

interface Activity {
  id: number;
  type: string;
  description: string;
  time: Date;
}

@Component({
  selector: 'app-home-dashboard',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule],
  templateUrl: './home-dashboard.component.html',
  styleUrl: './home-dashboard.component.scss'
})
export class HomeDashboardComponent implements OnInit, OnDestroy {
  isLoggedIn = false;
  currentUser: User | null = null;
  properties: Property[] = [];
  featuredProperties: Property[] = [];
  activities: Activity[] = [];
  filter: PropertyFilter = {
    price: { min: null, max: null },
    beds: null,
    baths: null,
    sqft: { min: null, max: null },
    location: null
  };
  searchTerm = '';
  
  private authSubscription: Subscription | null = null;
  
  // Default image path to use when actual images are not available
  defaultImagePath = 'assets/images/property-placeholder.jpg';

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
    // Subscribe to authentication state
    this.authSubscription = this.authService.currentUser$.subscribe(user => {
      this.isLoggedIn = !!user;
      this.currentUser = user;
      
      // Load property data regardless of auth state
      this.loadPropertyData();
      
      if (this.isLoggedIn) {
        // Load user-specific data if logged in
        this.loadUserData();
      }
    });
  }

  ngOnDestroy(): void {
    if (this.authSubscription) {
      this.authSubscription.unsubscribe();
    }
  }

  loadPropertyData(): void {
    // Mock property data
    const allProperties: Property[] = [
      {
        id: 1,
        name: 'Millpond',
        address: {
          street: '11660 Millpond Ave',
          city: 'Burnsville',
          state: 'MN',
          zipCode: '55337',
          country: 'USA'
        },
        description: 'Modern apartments with spacious floor plans and luxury amenities.',
        price: { min: 1500, max: 2200 },
        beds: { min: 2, max: 3 },
        baths: { min: 1, max: 2 },
        sqft: { min: 1200, max: 1800 },
        status: 'available',
        image: 'millpond.jpg',
        amenities: [
          'Swimming Pool',
          'Fitness Center',
          'Dog Park',
          'Resident Lounge',
          'Grilling Stations',
          'Secure Access',
          'In-unit Washer/Dryer',
          'Stainless Steel Appliances',
          'Walk-in Closets',
          'Granite Countertops',
          'Central Air Conditioning',
          'High-Speed Internet Ready'
        ],
        featured: true
      },
      {
        id: 2,
        name: 'Meadow Grass Lane',
        address: {
          street: 'Meadow Grass Lane S',
          city: 'Cottage Grove',
          state: 'MN',
          zipCode: '55016',
          country: 'USA'
        },
        description: 'Spacious single-family homes with modern finishes.',
        price: { min: 2200, max: 2800 },
        beds: { min: 3, max: 4 },
        baths: { min: 2, max: 3 },
        sqft: { min: 1800, max: 2500 },
        status: 'available',
        image: 'meadow-grass.jpg',
        amenities: [
          'Attached Garage',
          'Private Backyard',
          'Modern Kitchen',
          'Hardwood Floors',
          'Finished Basement',
          'Central Air Conditioning',
          'High-Speed Internet Ready',
          'Energy-Efficient Appliances'
        ],
        featured: true
      },
      {
        id: 3,
        name: 'West Street',
        address: {
          street: '137th West Street',
          city: 'Savage',
          state: 'MN',
          zipCode: '55378',
          country: 'USA'
        },
        description: 'Contemporary townhomes in a quiet neighborhood.',
        price: { min: 1800, max: 2400 },
        beds: { min: 2, max: 3 },
        baths: { min: 2, max: 2.5 },
        sqft: { min: 1500, max: 2000 },
        status: 'available',
        image: 'west-street.jpg',
        amenities: [
          'Community Park',
          'Walking Trails',
          'Attached Garage',
          'Stainless Steel Appliances',
          'Granite Countertops',
          'Hardwood Floors',
          'Central Air Conditioning',
          'High-Speed Internet Ready'
        ],
        featured: false
      },
      {
        id: 4,
        name: 'Juniper Court',
        address: {
          street: 'Juniper Court',
          city: 'Shakopee',
          state: 'MN',
          zipCode: '55379',
          country: 'USA'
        },
        description: 'Luxury apartments with modern amenities and spacious layouts.',
        price: { min: 1700, max: 2300 },
        beds: { min: 1, max: 3 },
        baths: { min: 1, max: 2 },
        sqft: { min: 900, max: 1600 },
        status: 'available',
        image: 'juniper-court.jpg',
        amenities: [
          'Swimming Pool',
          'Fitness Center',
          'Rooftop Lounge',
          'Secure Access',
          'In-unit Washer/Dryer',
          'Stainless Steel Appliances',
          'Walk-in Closets',
          'Granite Countertops'
        ],
        featured: false
      },
      {
        id: 5,
        name: '92nd Street',
        address: {
          street: '92nd Street',
          city: 'Cottage Grove',
          state: 'MN',
          zipCode: '55016',
          country: 'USA'
        },
        description: 'Cozy apartments with a community feel and modern updates.',
        price: { min: 1300, max: 1900 },
        beds: { min: 1, max: 2 },
        baths: { min: 1, max: 1.5 },
        sqft: { min: 800, max: 1200 },
        status: 'available',
        image: '92nd-street.jpg',
        amenities: [
          'Community Garden',
          'On-site Laundry',
          'Pet-friendly',
          'Updated Kitchens',
          'Playground',
          'Ample Parking',
          'High-Speed Internet Ready'
        ],
        featured: false
      }
    ];
    
    this.properties = allProperties;
    this.featuredProperties = allProperties.filter(p => p.featured);
  }

  loadUserData(): void {
    // Mock activities data for logged-in users
    this.activities = [
      {
        id: 1,
        type: 'payment',
        description: 'Received rent payment from John Doe',
        time: new Date(new Date().setDate(new Date().getDate() - 2))
      },
      {
        id: 2,
        type: 'maintenance',
        description: 'New maintenance request for 123 Main St, Apt 101',
        time: new Date(new Date().setDate(new Date().getDate() - 3))
      },
      {
        id: 3,
        type: 'lease',
        description: 'Lease renewal for 456 Oak Ave, Unit 202',
        time: new Date(new Date().setDate(new Date().getDate() - 5))
      },
      {
        id: 4,
        type: 'message',
        description: 'New message from Sarah Johnson',
        time: new Date(new Date().setDate(new Date().getDate() - 6))
      }
    ];
  }

  applyFilters(): void {
    console.log('Applying filters:', this.filter);
    // Implement filter logic - in a real app, this would navigate with filter params
    this.router.navigate(['/properties'], { 
      queryParams: { 
        minPrice: this.filter.price.min,
        maxPrice: this.filter.price.max,
        beds: this.filter.beds,
        baths: this.filter.baths,
        minSqft: this.filter.sqft.min,
        maxSqft: this.filter.sqft.max
      } 
    });
  }

  searchProperties(): void {
    console.log('Searching for:', this.searchTerm);
    // In a real app, this would filter properties or navigate to search results
    this.router.navigate(['/properties'], { 
      queryParams: { search: this.searchTerm } 
    });
  }

  getFormattedAddress(property: Property): string {
    if (!property) return '';
    return `${property.address.street}, ${property.address.city}, ${property.address.state} ${property.address.zipCode}`;
  }

  getPropertyBedsLabel(property: Property): string {
    if (!property || !property.beds) return '';
    if (property.beds.min === property.beds.max) {
      return `${property.beds.min} Bed${property.beds.min !== 1 ? 's' : ''}`;
    }
    return `${property.beds.min}-${property.beds.max} Beds`;
  }

  getPropertyBathsLabel(property: Property): string {
    if (!property || !property.baths) return '';
    if (property.baths.min === property.baths.max) {
      return `${property.baths.min} Bath${property.baths.min !== 1 ? 's' : ''}`;
    }
    return `${property.baths.min}-${property.baths.max} Baths`;
  }

  getPropertySqftLabel(property: Property): string {
    if (!property || !property.sqft) return '';
    if (property.sqft.min === property.sqft.max) {
      return `${property.sqft.min} sqft`;
    }
    return `${property.sqft.min}-${property.sqft.max} sqft`;
  }

  getPropertyPriceLabel(property: Property): string {
    if (!property || !property.price) return '';
    if (property.price.min === property.price.max) {
      return `$${property.price.min}/month`;
    }
    return `$${property.price.min}-$${property.price.max}/month`;
  }

  getActivityIcon(type: string): string {
    switch (type) {
      case 'payment': return 'dollar-sign';
      case 'maintenance': return 'tools';
      case 'lease': return 'file-contract';
      case 'message': return 'envelope';
      default: return 'circle';
    }
  }

  navigateToRegister(): void {
    this.router.navigate(['/auth/register']);
  }

  navigateToLogin(): void {
    this.router.navigate(['/auth/login']);
  }

  navigateToDashboard(): void {
    this.router.navigate(['/dashboard']);
  }

  // Get appropriate image URL, falling back to default if needed
  getPropertyImageUrl(property: Property | undefined): string {
    if (!property || !property.image) {
      return this.defaultImagePath;
    }
    return `assets/images/${property.image}`;
  }
}
