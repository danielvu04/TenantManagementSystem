import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { MaintenanceRequest } from '../models/maintenance.model';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MaintenanceService {
  private apiUrl = `${environment.apiUrl}/api/maintenance`;

  constructor(private http: HttpClient) { }

  getAllRequests(): Observable<MaintenanceRequest[]> {
    return this.http.get<MaintenanceRequest[]>(this.apiUrl);
  }

  getRequest(id: string): Observable<MaintenanceRequest> {
    return this.http.get<MaintenanceRequest>(`${this.apiUrl}/${id}`);
  }

  getMyRequests(): Observable<MaintenanceRequest[]> {
    return this.http.get<MaintenanceRequest[]>(`${this.apiUrl}/my-requests`);
  }

  getPropertyRequests(propertyId: string): Observable<MaintenanceRequest[]> {
    return this.http.get<MaintenanceRequest[]>(`${this.apiUrl}/property/${propertyId}`);
  }

  createRequest(request: Partial<MaintenanceRequest>): Observable<MaintenanceRequest> {
    return this.http.post<MaintenanceRequest>(this.apiUrl, request);
  }

  updateRequest(id: string, request: Partial<MaintenanceRequest>): Observable<MaintenanceRequest> {
    return this.http.put<MaintenanceRequest>(`${this.apiUrl}/${id}`, request);
  }

  deleteRequest(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  updateStatus(id: string, status: string): Observable<MaintenanceRequest> {
    return this.http.patch<MaintenanceRequest>(`${this.apiUrl}/${id}/status`, { status });
  }

  assignMaintenance(id: string, assignedTo: string): Observable<MaintenanceRequest> {
    return this.http.patch<MaintenanceRequest>(`${this.apiUrl}/${id}/assign`, { assignedTo });
  }

  scheduleRequest(id: string, scheduledDate: Date): Observable<MaintenanceRequest> {
    return this.http.patch<MaintenanceRequest>(`${this.apiUrl}/${id}/schedule`, { scheduledDate });
  }

  completeRequest(id: string, notes: string): Observable<MaintenanceRequest> {
    return this.http.patch<MaintenanceRequest>(`${this.apiUrl}/${id}/complete`, { 
      notes,
      completionDate: new Date() 
    });
  }
} 