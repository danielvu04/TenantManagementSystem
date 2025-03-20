import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Lease } from '../models/lease.model';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LeaseService {
  private apiUrl = `${environment.apiUrl}/api/leases`;

  constructor(private http: HttpClient) { }

  getAllLeases(): Observable<Lease[]> {
    return this.http.get<Lease[]>(this.apiUrl);
  }

  getLease(id: string): Observable<Lease> {
    return this.http.get<Lease>(`${this.apiUrl}/${id}`);
  }

  getMyLeases(): Observable<Lease[]> {
    return this.http.get<Lease[]>(`${this.apiUrl}/my-leases`);
  }

  createLease(lease: Partial<Lease>): Observable<Lease> {
    return this.http.post<Lease>(this.apiUrl, lease);
  }

  updateLease(id: string, lease: Partial<Lease>): Observable<Lease> {
    return this.http.put<Lease>(`${this.apiUrl}/${id}`, lease);
  }

  deleteLease(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  activateLease(id: string): Observable<Lease> {
    return this.http.patch<Lease>(`${this.apiUrl}/${id}/activate`, {});
  }

  deactivateLease(id: string): Observable<Lease> {
    return this.http.patch<Lease>(`${this.apiUrl}/${id}/deactivate`, {});
  }

  renewLease(id: string, lease: Partial<Lease>): Observable<Lease> {
    return this.http.post<Lease>(`${this.apiUrl}/${id}/renew`, lease);
  }
} 