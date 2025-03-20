import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { PropertyService } from '../../../core/services/property.service';
import { AuthService } from '../../../core/services/auth.service';
import { Property } from '../../../core/models/property.model';
import { Router } from '@angular/router';

interface FilterOptions {
  status: string;
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
  propertyTypes = ['all', 'apartment', 'house', 'condo', 'townhouse', 'other'];
  selectedType = 'all';
  priceRange = [0, 10000];
  selectedPrice = [0, 10000];
  bedroomsFilter = 'all';
  availabilityFilter = 'all';
  viewMode = 'grid'; // 'grid' or 'list'
  currentPage = 1;
  totalPages = 1;
  pageSize = 9;
  userIsLandlord = false;
  
  filterOptions: FilterOptions = {
    status: 'all'
  };

  constructor(
    private propertyService: PropertyService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.userIsLandlord = this.authService.isLandlord();
    this.loadProperties();
  }

  loadProperties(): void {
    this.isLoading = true;
    
    // Different loading strategies based on role
    if (this.authService.isLandlord()) {
      this.propertyService.getMyProperties().subscribe({
        next: (data: Property[]) => {
          this.properties = data;
          this.filteredProperties = [...data];
          this.initFilters();
          this.totalPages = Math.ceil(this.properties.length / this.pageSize);
          this.isLoading = false;
        },
        error: (error: Error) => {
          this.errorMessage = 'Failed to load properties. Please try again.';
          console.error('Error loading properties:', error);
          this.isLoading = false;
        }
      });
    } else {
      // For tenants or unauthenticated users, show available properties
      this.propertyService.getAvailableProperties().subscribe({
        next: (data: Property[]) => {
          this.properties = data;
          this.filteredProperties = [...data];
          this.initFilters();
          this.totalPages = Math.ceil(this.properties.length / this.pageSize);
          this.isLoading = false;
        },
        error: (error: Error) => {
          this.errorMessage = 'Failed to load properties. Please try again.';
          console.error('Error loading properties:', error);
          this.isLoading = false;
        }
      });
    }
  }

  initFilters(): void {
    if (this.properties.length) {
      // Find min and max rent
      const prices = this.properties.map(p => p.units > 0 && p.unitsList && p.unitsList.length > 0 ? 
        p.unitsList[0].rent : 0);
      this.priceRange = [
        Math.min(...prices),
        Math.max(...prices)
      ];
      this.selectedPrice = [...this.priceRange];
    }
  }

  applyFilters(): void {
    this.filteredProperties = this.properties.filter(property => {
      // Search term filter
      const matchesSearch = !this.searchTerm || 
        property.name.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        property.description.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        property.address.city.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        property.address.state.toLowerCase().includes(this.searchTerm.toLowerCase());
      
      // Property type filter
      const matchesType = this.selectedType === 'all' || property.type === this.selectedType;
      
      // Price range filter - use first unit price or property price
      let price = 0;
      if (property.unitsList && property.unitsList.length > 0) {
        price = property.unitsList[0].rent;
      }
      const matchesPrice = price >= this.selectedPrice[0] && price <= this.selectedPrice[1];
      
      // Bedrooms filter - check first unit or property bedrooms
      let bedrooms = property.bedrooms;
      if (property.unitsList && property.unitsList.length > 0) {
        bedrooms = property.unitsList[0].bedrooms;
      }
      const matchesBedrooms = this.bedroomsFilter === 'all' || 
        (this.bedroomsFilter === '4+' ? bedrooms >= 4 : bedrooms.toString() === this.bedroomsFilter);
      
      // Availability filter
      const matchesAvailability = this.availabilityFilter === 'all' || 
        (this.availabilityFilter === 'available' ? property.isAvailable : !property.isAvailable);
      
      return matchesSearch && matchesType && matchesPrice && matchesBedrooms && matchesAvailability;
    });
  }

  clearFilters(): void {
    this.searchTerm = '';
    this.selectedType = 'all';
    this.selectedPrice = [...this.priceRange];
    this.bedroomsFilter = 'all';
    this.availabilityFilter = 'all';
    this.filteredProperties = [...this.properties];
  }

  get isLandlord(): boolean {
    return this.authService.isLandlord();
  }

  get isTenant(): boolean {
    return this.authService.isTenant();
  }

  get isAuthenticated(): boolean {
    return this.authService.isAuthenticated();
  }

  addProperty(): void {
    this.router.navigate(['/properties/add']);
  }

  viewProperty(id: string): void {
    this.router.navigate(['/properties', id]);
  }

  editProperty(id: string): void {
    this.router.navigate(['/properties', id, 'edit']);
  }

  changePage(page: number): void {
    if (page < 1 || page > this.totalPages) {
      return;
    }
    
    this.currentPage = page;
    this.loadProperties();
  }
}
