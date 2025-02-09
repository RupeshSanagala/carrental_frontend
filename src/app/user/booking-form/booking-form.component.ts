import { AuthService } from './../../services/auth.service';
import { UserbookingService } from './../../services/userbooking.service';
import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatDialogModule } from '@angular/material/dialog';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-booking-form',
  standalone: true,
  imports: [
    CommonModule,
    MatDialogModule,
    ReactiveFormsModule
  ],
  templateUrl: './booking-form.component.html',
  styleUrls: ['./booking-form.component.css']
})
export class BookingFormComponent {
  bookingForm: FormGroup;
  userId: number | null = null;
  constructor(
    private fb: FormBuilder,
    private bookingService: UserbookingService,
    private authService:AuthService,
    private dialogRef: MatDialogRef<BookingFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.userId = this.authService.getUserId();
    this.bookingForm = this.fb.group({
      fullName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
      pickupDate: ['', Validators.required],  // Native date input
      dropoffDate: ['', Validators.required], // Native date input
      carId: [data.carId, Validators.required]  // Car ID passed from parent
    });
  }

  submitBooking() {
    if (this.bookingForm.valid) {
      const bookingData = {
        userId: this.userId, // Replace with actual logged-in user ID
        carId: this.bookingForm.value.carId,
        startDate: this.bookingForm.value.pickupDate,
        endDate: this.bookingForm.value.dropoffDate
      };

      this.bookingService.createBooking(bookingData).subscribe(response => {
        alert('Booking Successful');
        this.dialogRef.close();
      }, error => {
        alert('Booking Failed: ' + error.error);
      });
    }
  }

  closeDialog() {
    this.dialogRef.close();
  }
}
