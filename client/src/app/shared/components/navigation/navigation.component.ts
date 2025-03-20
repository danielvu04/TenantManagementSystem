import { Component, OnInit, OnDestroy, PLATFORM_ID, Inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { AuthService } from '../../../core/services/auth.service';
import { User } from '../../../core/models/user.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-navigation',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './navigation.component.html',
  styleUrl: './navigation.component.scss'
})
export class NavigationComponent implements OnInit, OnDestroy {
  currentUser: User | null = null;
  isMenuOpen = false;
  isBrowser: boolean;
  private authSubscription: Subscription | null = null;

  constructor(
    private authService: AuthService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  ngOnInit(): void {
    if (this.isBrowser) {
      console.log('Navigation component initialized');
      // Subscribe to authentication changes
      this.authSubscription = this.authService.currentUser$.subscribe(user => {
        console.log('Auth state changed, current user:', user);
        this.currentUser = user;
      });
    }
  }

  ngOnDestroy(): void {
    // Clean up subscription when component is destroyed
    if (this.authSubscription) {
      this.authSubscription.unsubscribe();
    }
  }

  logout(): void {
    console.log('Logout clicked');
    this.authService.logout();
  }

  toggleMenu(): void {
    this.isMenuOpen = !this.isMenuOpen;
  }

  get isLandlord(): boolean {
    const result = this.authService.isLandlord();
    console.log('Is landlord check:', result);
    return result;
  }

  get isTenant(): boolean {
    const result = this.authService.isTenant();
    console.log('Is tenant check:', result);
    return result;
  }

  get isAdmin(): boolean {
    const result = this.authService.isAdmin();
    console.log('Is admin check:', result); 
    return result;
  }

  get isAuthenticated(): boolean {
    const result = this.authService.isAuthenticated();
    console.log('Is authenticated check:', result);
    return result;
  }
}
