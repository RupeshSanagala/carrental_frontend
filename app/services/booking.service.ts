import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Booking {
  bookingId: number;
  userId: number;
  carId: number;
  startDate: string;
  endDate: string;
  totalPrice: number;
  status: string;
  car: {
    name: string;
    model: string;
  };
}

@Injectable({
  providedIn: 'root'
})
export class BookingService {
  private apiUrl = 'http://localhost:5217/api/admin/bookings';

  constructor(private http: HttpClient) {}

  // ✅ Get bookings by user
  getUserBookings(userId: number): Observable<Booking[]> {
    return this.http.get<Booking[]>(`${this.apiUrl}/user/${userId}`);
  }

  // ✅ Cancel a booking
  cancelBooking(bookingId: number): Observable<any> {
    return this.http.put(`${this.apiUrl}/${bookingId}/cancel`, {});
  }
}
