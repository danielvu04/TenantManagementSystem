import { HttpInterceptorFn, HttpRequest, HttpHandlerFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';

export const authInterceptor: HttpInterceptorFn = (
  req: HttpRequest<unknown>,
  next: HttpHandlerFn
) => {
  const router = inject(Router);
  
  // Get the auth token from localStorage
  const token = localStorage.getItem('token');
  
  // Clone the request and add the auth header if token exists
  if (token) {
    console.log('Adding auth token to request:', req.url);
    const authReq = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
    return next(authReq).pipe(
      catchError(error => {
        // Handle authentication errors
        if (error.status === 401) {
          console.error('Authentication error, redirecting to login');
          // Clear local storage
          localStorage.removeItem('user');
          localStorage.removeItem('token');
          localStorage.removeItem('tokenExpiration');
          // Redirect to login
          router.navigate(['/auth/login']);
        }
        return throwError(() => error);
      })
    );
  }

  // If no token, just pass the request through
  return next(req);
}; 