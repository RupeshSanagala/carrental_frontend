export interface Booking {
    id?: number;  // Optional for new bookings
    userId: number;
    carId: number;
    startDate: string;
    endDate: string;
    status: string; // "Confirmed", "Cancelled"
  }
  