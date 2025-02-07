import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
interface Booking {
  id?: number;
  customerName: string;
  car: string;
  bookingDate?: string;
  pickupDate: string;
  returnDate: string;
  status: string;
}

@Component({
  selector: 'app-booking-management',
  imports:[FormsModule,CommonModule],
  templateUrl: './booking-management.component.html'
})
export class BookingManagementComponent {
  bookings: Booking[] = [
    { id: 1, customerName: "John Doe", car: "Toyota Camry", pickupDate: "2024-02-05", returnDate: "2024-02-10", status: "Pending" },
    { id: 2, customerName: "Jane Smith", car: "Honda Civic", pickupDate: "2024-02-07", returnDate: "2024-02-14", status: "Confirmed" }
  ];
  selectedBooking: Booking = { customerName: '', car: '', pickupDate: '', returnDate: '', status: 'Pending' };
  showForm: boolean = false;
  isEditing: boolean = false;

  editBooking(booking: Booking) {
    this.selectedBooking = { ...booking }; 
    this.isEditing = true;
    this.showForm = true;
  }

  saveBooking() {
    if (this.isEditing) {
      this.isEditing = false;
    } else {
      this.bookings.push({ ...this.selectedBooking, id: this.bookings.length + 1 });
    }
    this.showForm = false;
  }

  toggleForm() {
    this.showForm = !this.showForm;
    if (!this.showForm) this.selectedBooking = { customerName: '', car: '', pickupDate: '', returnDate: '', status: 'Pending' };
  }

  confirmBooking(booking: Booking) {
    booking.status = 'Confirmed';
    console.log(`Booking ID ${booking.id} has been confirmed.`);
  }

  cancelBooking(booking: Booking) {
    booking.status = 'Cancelled';
    console.log(`Booking ID ${booking.id} has been cancelled.`);
  }

  viewBookingDetails(booking: Booking) {
    console.log('Booking Details:', booking);
    alert(`Booking Details:\nCustomer: ${booking.customerName}\nCar: ${booking.car}\nPick-Up: ${booking.pickupDate}\nReturn: ${booking.returnDate}\nStatus: ${booking.status}`);
  }
}
