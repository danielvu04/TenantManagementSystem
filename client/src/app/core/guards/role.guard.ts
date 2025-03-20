import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {
  
  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const user = this.authService.getCurrentUser();
    
    if (!user) {
      this.router.navigate(['/auth/login'], {
        queryParams: { returnUrl: state.url }
      });
      return false;
    }
    
    // Check if route has data.roles and if the user has one of those roles
    const roles = route.data['roles'] as Array<string>;
    
    if (!roles || roles.length === 0) {
      return true; // No specific roles required
    }
    
    const hasRole = roles.some(role => {
      switch (role) {
        case 'landlord':
          return this.authService.isLandlord();
        case 'tenant':
          return this.authService.isTenant();
        case 'admin':
          return this.authService.isAdmin();
        default:
          return false;
      }
    });
    
    if (hasRole) {
      return true;
    }
    
    // User does not have the required role, redirect to appropriate dashboard
    if (this.authService.isLandlord()) {
      this.router.navigate(['/dashboard/landlord']);
    } else if (this.authService.isTenant()) {
      this.router.navigate(['/dashboard/tenant']);
    } else {
      this.router.navigate(['/dashboard/home']);
    }
    
    return false;
  }
} 