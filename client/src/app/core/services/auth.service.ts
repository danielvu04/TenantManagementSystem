import { HttpClient } from '@angular/common/http';
import { Injectable, PLATFORM_ID, Inject } from '@angular/core';
import { BehaviorSubject, Observable, tap, throwError, of } from 'rxjs';
import { User } from '../models/user.model';
import { environment } from '../../../environments/environment';
import { isPlatformBrowser } from '@angular/common';
import { Router } from '@angular/router';
import { catchError, map, switchMap } from 'rxjs/operators';

interface AuthResponse {
  token: string;
  user: User;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // The primary API endpoint is '/api/users' as configured in the server
  private apiUrl = `${environment.apiUrl}/users`;
  
  private currentUserSubject = new BehaviorSubject<User | null>(null);
  public currentUser$ = this.currentUserSubject.asObservable();
  private tokenExpirationTimer: any;
  private isBrowser: boolean;

  constructor(
    private http: HttpClient,
    @Inject(PLATFORM_ID) private platformId: Object,
    private router: Router
  ) {
    this.isBrowser = isPlatformBrowser(this.platformId);
    if (this.isBrowser) {
      this.loadStoredUser();
    }
  }

  private loadStoredUser(): void {
    const storedUser = localStorage.getItem('user');
    const storedToken = localStorage.getItem('token');
    const tokenExpirationDate = localStorage.getItem('tokenExpiration');

    if (storedUser && storedToken && tokenExpirationDate) {
      const user = JSON.parse(storedUser);
      const expirationDate = new Date(tokenExpirationDate);

      if (expirationDate > new Date()) {
        console.log('Found valid stored user:', user);
        this.currentUserSubject.next(user);
        
        const expirationDuration = expirationDate.getTime() - new Date().getTime();
        this.autoLogout(expirationDuration);
      } else {
        console.log('Token expired, logging out');
        this.logout();
      }
    } else {
      console.log('No stored user found');
    }
  }

  register(userData: any): Observable<AuthResponse> {
    console.log('Registering user with data:', userData);
    
    return this.http.post<AuthResponse>(`${this.apiUrl}/register`, userData)
      .pipe(
        tap(response => {
          console.log('Registration response:', response);
          this.handleAuthentication(response);
        }),
        catchError(error => {
          console.error('Registration error:', error);
          return throwError(() => new Error(
            error.error?.message || 
            'Failed to register. Please try again with different credentials.'
          ));
        })
      );
  }

  login(email: string, password: string): Observable<AuthResponse> {
    console.log('Logging in user:', email);
    
    return this.http.post<AuthResponse>(`${this.apiUrl}/login`, { email, password })
      .pipe(
        tap(response => {
          console.log('Login response:', response);
          this.handleAuthentication(response);
        }),
        catchError(error => {
          console.error('Login error:', error);
          return throwError(() => new Error(
            error.error?.message || 
            'Failed to login. Please check your credentials and try again.'
          ));
        })
      );
  }

  logout(): void {
    console.log('Logging out...');
    this.currentUserSubject.next(null);
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    localStorage.removeItem('tokenExpiration');

    if (this.tokenExpirationTimer) {
      clearTimeout(this.tokenExpirationTimer);
    }

    this.router.navigate(['/']);
  }

  getCurrentUser(): User | null {
    return this.currentUserSubject.value;
  }

  isAuthenticated(): boolean {
    const user = this.currentUserSubject.value;
    const token = this.isBrowser ? localStorage.getItem('token') : null;
    const isLoggedIn = !!user && !!token;
    console.log('Authentication check:', isLoggedIn, 'User:', user?.firstName, 'Token exists:', !!token);
    return isLoggedIn;
  }

  // Alias for isAuthenticated for more readable code
  isLoggedIn(): boolean {
    return this.isAuthenticated();
  }

  getToken(): string | null {
    return this.isBrowser ? localStorage.getItem('token') : null;
  }

  getUserRole(): string | null {
    const user = this.currentUserSubject.value;
    return user ? user.role : null;
  }

  isLandlord(): boolean {
    return this.getUserRole() === 'landlord';
  }

  isTenant(): boolean {
    return this.getUserRole() === 'tenant';
  }

  isAdmin(): boolean {
    return this.getUserRole() === 'admin';
  }

  private handleAuthentication(response: AuthResponse): void {
    const { token, user } = response;
    console.log('Handling authentication for user:', user);

    // Set token expiration to 1 day from now
    const expirationDate = new Date(new Date().getTime() + 24 * 60 * 60 * 1000);

    this.currentUserSubject.next(user);
    localStorage.setItem('user', JSON.stringify(user));
    localStorage.setItem('token', token);
    localStorage.setItem('tokenExpiration', expirationDate.toISOString());

    this.autoLogout(24 * 60 * 60 * 1000);
  }

  private autoLogout(expirationDuration: number): void {
    if (!this.isBrowser) return;

    this.tokenExpirationTimer = setTimeout(() => {
      console.log('Token expired, auto logout triggered');
      this.logout();
    }, expirationDuration);
  }

  updateProfile(userData: Partial<User>): Observable<User> {
    const userId = this.getCurrentUser()?._id;
    if (!userId) {
      return throwError(() => new Error('User not authenticated'));
    }
    
    return this.http.put<User>(`${this.apiUrl}/profile/${userId}`, userData)
      .pipe(
        tap(updatedUser => {
          const currentUser = this.currentUserSubject.value;
          if (currentUser) {
            const newUser = { ...currentUser, ...updatedUser };
            this.currentUserSubject.next(newUser);
            localStorage.setItem('user', JSON.stringify(newUser));
          }
        }),
        catchError(error => {
          // Try alternate endpoint
          return this.http.put<User>(`${this.apiUrl}/profile/${userId}`, userData)
            .pipe(
              tap(updatedUser => {
                const currentUser = this.currentUserSubject.value;
                if (currentUser) {
                  const newUser = { ...currentUser, ...updatedUser };
                  this.currentUserSubject.next(newUser);
                  localStorage.setItem('user', JSON.stringify(newUser));
                }
              }),
              catchError(this.handleError)
            );
        })
      );
  }

  changePassword(currentPassword: string, newPassword: string): Observable<any> {
    const userId = this.getCurrentUser()?._id;
    if (!userId) {
      return throwError(() => new Error('User not authenticated'));
    }
    
    return this.http.put(`${this.apiUrl}/change-password/${userId}`, { currentPassword, newPassword })
      .pipe(
        catchError(error => {
          // Try alternate endpoint
          return this.http.put(`${this.apiUrl}/change-password/${userId}`, { currentPassword, newPassword })
            .pipe(
              catchError(this.handleError)
            );
        })
      );
  }

  forgotPassword(email: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/forgot-password`, { email })
      .pipe(
        catchError(error => {
          // Try alternate endpoint
          return this.http.post(`${this.apiUrl}/forgot-password`, { email })
            .pipe(
              catchError(this.handleError)
            );
        })
      );
  }

  resetPassword(token: string, newPassword: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/reset-password`, { token, newPassword })
      .pipe(
        catchError(error => {
          // Try alternate endpoint
          return this.http.post(`${this.apiUrl}/reset-password`, { token, newPassword })
            .pipe(
              catchError(this.handleError)
            );
        })
      );
  }

  private handleError(error: any) {
    let errorMessage = 'An unknown error occurred';

    if (error.error instanceof ErrorEvent) {
      // Client-side error
      errorMessage = `Error: ${error.error.message}`;
    } else if (error.error && error.error.message) {
      // Server-side error with message
      errorMessage = error.error.message;
    } else {
      // Other server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }

    console.error(errorMessage);
    return throwError(() => new Error(errorMessage));
  }
} 