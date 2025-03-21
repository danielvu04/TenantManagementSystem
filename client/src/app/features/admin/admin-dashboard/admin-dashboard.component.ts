import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../core/services/auth.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.scss'],
  standalone: true,
  imports: [CommonModule, RouterLink]
})
export class AdminDashboardComponent implements OnInit {
  currentUser: any = null;
  isAdmin = false;
  isLandlord = false;

  // Stats for dashboard
  stats = {
    properties: 5,
    tenants: 12,
    maintenanceRequests: 8,
    pendingPayments: 3
  };

  // Recent activities
  recentActivities = [
    { 
      id: 1, 
      type: 'property', 
      action: 'added', 
      description: 'New property: Riverside Apartments', 
      date: new Date(new Date().setDate(new Date().getDate() - 1))
    },
    { 
      id: 2, 
      type: 'tenant', 
      action: 'registered', 
      description: 'New tenant: John Doe', 
      date: new Date(new Date().setDate(new Date().getDate() - 2))
    },
    { 
      id: 3, 
      type: 'maintenance', 
      action: 'submitted', 
      description: 'New maintenance request: Leaking faucet at Unit 302', 
      date: new Date(new Date().setDate(new Date().getDate() - 3))
    },
    { 
      id: 4, 
      type: 'payment', 
      action: 'received', 
      description: 'Payment received: $1,500 from Sarah Johnson', 
      date: new Date(new Date().setDate(new Date().getDate() - 4))
    }
  ];

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.currentUser = this.authService.getCurrentUser();
    this.isAdmin = this.authService.isAdmin();
    this.isLandlord = this.authService.isLandlord();

    // Redirect if not an admin or landlord
    if (!this.isAdmin && !this.isLandlord) {
      this.router.navigate(['/']);
    }
  }

  getActivityIcon(type: string): string {
    switch(type) {
      case 'property': return 'fa-building';
      case 'tenant': return 'fa-user';
      case 'maintenance': return 'fa-tools';
      case 'payment': return 'fa-dollar-sign';
      default: return 'fa-info-circle';
    }
  }

  getActivityClass(type: string): string {
    switch(type) {
      case 'property': return 'activity-property';
      case 'tenant': return 'activity-tenant';
      case 'maintenance': return 'activity-maintenance';
      case 'payment': return 'activity-payment';
      default: return '';
    }
  }

  navigateTo(path: string): void {
    this.router.navigate([path]);
  }
} 