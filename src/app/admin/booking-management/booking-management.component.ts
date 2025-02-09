import { Component, OnInit } from '@angular/core';
import { BookingService, Booking } from '../../services/booking.service';

@Component({
  selector: 'app-admin-booking-management',
  templateUrl: './admin-booking-management.component.html',
  styleUrls: ['./admin-booking-management.component.css']
})
export class BookingManagementComponent implements OnInit {
  bookings: Booking[] = [];
  loading = true;

  constructor(private bookingService: BookingService) {}

  ngOnInit(): void {
    this.fetchBookings();
  }

  fetchBookings() {
    const adminId = 1; // Replace with actual admin ID if required
    this.bookingService.getUserBookings(adminId).subscribe(
      (data:any) => {
        this.bookings = data;
        this.loading = false;
      },
      (error:any) => {
        console.error('Error fetching bookings:', error);
        this.loading = false;
      }
    );
  }

  cancelBooking(bookingId: number) {
    if (confirm('Are you sure you want to cancel this booking?')) {
      this.bookingService.cancelBooking(bookingId).subscribe(
        () => {
          this.bookings = this.bookings.filter(booking => booking.bookingId !== bookingId);
          alert('Booking canceled successfully.');
        },
        (error:any) => {
          console.error('Error canceling booking:', error);
          alert('Failed to cancel booking.');
        }
      );
    }
  }
}
