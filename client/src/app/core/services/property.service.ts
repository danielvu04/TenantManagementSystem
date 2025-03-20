import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Property } from '../models/property.model';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PropertyService {
  private apiUrl = `${environment.apiUrl}/properties`;

  constructor(private http: HttpClient) { }

  getProperties(filters?: any): Observable<Property[]> {
    let queryParams = '';
    
    if (filters) {
      const params = new URLSearchParams();
      
      if (filters.status) {
        params.append('status', filters.status);
      }
      
      if (filters.search) {
        params.append('search', filters.search);
      }
      
      if (filters.page) {
        params.append('page', filters.page.toString());
      }
      
      if (filters.limit) {
        params.append('limit', filters.limit.toString());
      }
      
      queryParams = `?${params.toString()}`;
    }
    
    return this.http.get<Property[]>(`${this.apiUrl}${queryParams}`)
      .pipe(
        catchError(this.handleError)
      );
  }

  // Method for landlords to get their properties
  getMyProperties(): Observable<Property[]> {
    return this.http.get<Property[]>(`${this.apiUrl}/my-properties`)
      .pipe(
        catchError(this.handleError)
      );
  }

  // Method to get available properties
  getAvailableProperties(): Observable<Property[]> {
    return this.http.get<Property[]>(`${this.apiUrl}/available`)
      .pipe(
        catchError(this.handleError)
      );
  }

  getPropertyById(id: string): Observable<Property> {
    return this.http.get<Property>(`${this.apiUrl}/${id}`)
      .pipe(
        catchError(this.handleError)
      );
  }

  createProperty(propertyData: any): Observable<Property> {
    return this.http.post<Property>(this.apiUrl, propertyData)
      .pipe(
        catchError(this.handleError)
      );
  }

  updateProperty(id: string, propertyData: any): Observable<Property> {
    return this.http.put<Property>(`${this.apiUrl}/${id}`, propertyData)
      .pipe(
        catchError(this.handleError)
      );
  }

  deleteProperty(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`)
      .pipe(
        catchError(this.handleError)
      );
  }

  // Property units
  getPropertyUnits(propertyId: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/${propertyId}/units`)
      .pipe(
        catchError(this.handleError)
      );
  }

  getUnitById(propertyId: string, unitId: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/${propertyId}/units/${unitId}`)
      .pipe(
        catchError(this.handleError)
      );
  }

  createUnit(propertyId: string, unitData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/${propertyId}/units`, unitData)
      .pipe(
        catchError(this.handleError)
      );
  }

  updateUnit(propertyId: string, unitId: string, unitData: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${propertyId}/units/${unitId}`, unitData)
      .pipe(
        catchError(this.handleError)
      );
  }

  deleteUnit(propertyId: string, unitId: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${propertyId}/units/${unitId}`)
      .pipe(
        catchError(this.handleError)
      );
  }

  // Property tenants
  getPropertyTenants(propertyId: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/${propertyId}/tenants`)
      .pipe(
        catchError(this.handleError)
      );
  }

  // Property maintenance
  getPropertyMaintenanceRequests(propertyId: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/${propertyId}/maintenance`)
      .pipe(
        catchError(this.handleError)
      );
  }

  // Property finances
  getPropertyFinances(propertyId: string, period?: string): Observable<any> {
    let queryParams = '';
    
    if (period) {
      queryParams = `?period=${period}`;
    }
    
    return this.http.get(`${this.apiUrl}/${propertyId}/finances${queryParams}`)
      .pipe(
        catchError(this.handleError)
      );
  }

  private handleError(error: any) {
    console.error('An error occurred:', error);
    return throwError(() => error);
  }
} 