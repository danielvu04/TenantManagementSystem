import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Payment } from '../models/payment.model';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {
  private apiUrl = `${environment.apiUrl}/api/payments`;

  constructor(private http: HttpClient) { }

  getAllPayments(): Observable<Payment[]> {
    return this.http.get<Payment[]>(this.apiUrl);
  }

  getPayment(id: string): Observable<Payment> {
    return this.http.get<Payment>(`${this.apiUrl}/${id}`);
  }

  getMyPayments(): Observable<Payment[]> {
    return this.http.get<Payment[]>(`${this.apiUrl}/my-payments`);
  }

  getLeasePayments(leaseId: string): Observable<Payment[]> {
    return this.http.get<Payment[]>(`${this.apiUrl}/lease/${leaseId}`);
  }

  createPayment(payment: Partial<Payment>): Observable<Payment> {
    return this.http.post<Payment>(this.apiUrl, payment);
  }

  processPayment(id: string, paymentData: any): Observable<Payment> {
    return this.http.post<Payment>(`${this.apiUrl}/${id}/process`, paymentData);
  }

  updatePaymentStatus(id: string, status: string): Observable<Payment> {
    return this.http.patch<Payment>(`${this.apiUrl}/${id}/status`, { status });
  }

  recordPayment(leaseId: string, paymentData: Partial<Payment>): Observable<Payment> {
    return this.http.post<Payment>(`${this.apiUrl}/record`, { 
      leaseId,
      ...paymentData
    });
  }

  getPaymentsByDateRange(startDate: Date, endDate: Date): Observable<Payment[]> {
    return this.http.get<Payment[]>(
      `${this.apiUrl}/date-range?startDate=${startDate.toISOString()}&endDate=${endDate.toISOString()}`
    );
  }

  // For Stripe integration
  createPaymentIntent(amount: number, leaseId: string): Observable<{ clientSecret: string }> {
    return this.http.post<{ clientSecret: string }>(`${this.apiUrl}/create-payment-intent`, {
      amount,
      leaseId
    });
  }
} 