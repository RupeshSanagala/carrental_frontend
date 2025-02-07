
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


import { UserManagementComponent } from './admin/user-management/user-management.component';
import { BookingManagementComponent } from './admin/booking-management/booking-management.component';
import { AdminLoginComponent } from './admin/admin-login/admin-login.component';
import { CarManagementComponent } from './admin/car-management/car-management.component';
import { AuthGuard } from './services/auth.guard';
import { AppComponent } from './app.component';

export const routes: Routes = [
  
   
  { path: 'admin/dashboard', component: CarManagementComponent, canActivate: [AuthGuard] },
  { path: 'admin/users', component: UserManagementComponent, canActivate: [AuthGuard] },
  { path: 'admin/bookings', component: BookingManagementComponent, canActivate: [AuthGuard] },
  { path: 'login', component: AdminLoginComponent },
  { path: '**', redirectTo: 'login', pathMatch: 'full' } // Redirect unknown routes to login
      
 

];

