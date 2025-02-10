import { AuthService } from './../../services/auth.service';
import { UserbookingService } from './../../services/userbooking.service';


import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-booking-history',
  templateUrl: './booking-history.component.html',
  styleUrls: ['./booking-history.component.css']
})
export class MybookingsComponent implements OnInit {
  bookings: any[] = [];
  userId: number | null = null;
  constructor(private bookingService: UserbookingService, private authService:AuthService) {}

  ngOnInit() {
    this.userId = this.authService.getUserId();
    if (this.userId) {
      this.fetchBookings();
    } else {
      console.error('User not logged in');
    }
  }

  fetchBookings() {
    if (!this.userId) return;
    
    this.bookingService.getUserBookings(this.userId).subscribe(response => {
      this.bookings = response;
    }, error => {
      console.error('Error fetching bookings:', error);
    });
  }
}

