import { BookingFormComponent } from './../booking-form/booking-form.component';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { HttpClient } from '@angular/common/http';
import { MatDialogModule } from '@angular/material/dialog';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-display-cars',
  imports:[MatDialogModule, MatCardModule, MatButtonModule,CommonModule],
  templateUrl: './display-cars.component.html',
  styleUrls: ['./display-cars.component.css']
})
export class DisplayCarsComponent implements OnInit {
  cars: any[] = [];  // Stores fetched cars

  constructor(private http: HttpClient, private dialog: MatDialog) {}

  ngOnInit() {
    this.fetchCars();
  }

  fetchCars() {
    this.http.get<any[]>('http://localhost:5217/api/admin/cars').subscribe({
      next: (data) => this.cars = data,
      error: (err) => console.error('Error fetching cars:', err)
    });
  }

  openBookingForm(car: any) {
    const dialogRef = this.dialog.open(BookingFormComponent, {
      width: '800px',
      data: { carId: car.id, carName: car.name }
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        console.log('Booking Data:', result);
      }
    });
  }
}
