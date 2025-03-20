import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
import { User } from '../../../core/models/user.model';
import { Subscription } from 'rxjs';

interface Property {
  id: string;
  name: string;
  status: string;
}

interface Activity {
  type: string;
  description: string;
  time: Date;
}

@Component({
  selector: 'app-home-dashboard',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './home-dashboard.component.html',
  styleUrl: './home-dashboard.component.scss'
})
export class HomeDashboardComponent implements OnInit, OnDestroy {
  isLoggedIn = false;
  currentUser: User | null = null;
  properties: Property[] = [];
  activities: Activity[] = [];
  private authSubscription: Subscription | null = null;
  
  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
    // Subscribe to authentication state
    this.authSubscription = this.authService.currentUser$.subscribe(user => {
      this.isLoggedIn = !!user;
      this.currentUser = user;
      
      if (this.isLoggedIn) {
        // Mock data for properties and activities
        this.loadUserData();
      }
    });
  }

  ngOnDestroy(): void {
    if (this.authSubscription) {
      this.authSubscription.unsubscribe();
    }
  }

  loadUserData(): void {
    // Mock properties data
    this.properties = [
      { id: '1', name: 'Sunset Apartments, Unit 101', status: 'occupied' },
      { id: '2', name: 'Riverside Condos, Unit 3B', status: 'vacant' },
      { id: '3', name: 'Mountain View Plaza, Unit 505', status: 'maintenance' }
    ];

    // Mock activities data
    this.activities = [
      {
        type: 'payment',
        description: 'Rent payment received for Sunset Apartments, Unit 101',
        time: new Date(Date.now() - 3600000) // 1 hour ago
      },
      {
        type: 'maintenance',
        description: 'Maintenance request resolved for Riverside Condos',
        time: new Date(Date.now() - 7200000) // 2 hours ago
      },
      {
        type: 'lease',
        description: 'New lease signed for Mountain View Plaza, Unit 505',
        time: new Date(Date.now() - 86400000) // 1 day ago
      },
      {
        type: 'message',
        description: 'New message from John Smith regarding lease renewal',
        time: new Date(Date.now() - 172800000) // 2 days ago
      }
    ];
  }

  getActivityIcon(type: string): string {
    switch (type) {
      case 'payment':
        return 'money-bill-wave';
      case 'maintenance':
        return 'tools';
      case 'lease':
        return 'file-contract';
      case 'message':
        return 'envelope';
      default:
        return 'info-circle';
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
}
