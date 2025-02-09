import { ContactComponent } from './components/contact/contact.component';
import { AboutComponent } from './components/about/about.component';
import { HomeCompComponent } from './components/home-comp/home-comp.component';
import { AuthService } from './services/auth.service';
import { UserLoginComponent } from './user/user-login/user-login.component';
import { UserProfileComponent } from './user/user-profile/user-profile.component';
import { DisplayCarsComponent } from './user/display-cars/display-cars.component';
import { UserDashboardComponent } from './user/user-dashboard/user-dashboard.component';
import { AdminDashboardComponent } from './admin/admin-dashboard/admin-dashboard.component';

import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes, CanActivate } from '@angular/router';


import { UserManagementComponent } from './admin/user-management/user-management.component';
import { BookingManagementComponent } from './admin/booking-management/booking-management.component';

import { CarManagementComponent } from './admin/car-management/car-management.component';

import {MybookingsComponent} from './user/mybookings/mybookings.component';
import { AuthGuard } from './services/auth.guard';
import { AppComponent } from './app.component';

export const routes: Routes = [
  
   
   // Admin Routes (Parent-Child Structure)
   { 
    path: 'admin', 
    component: AdminDashboardComponent, 
    canActivate: [AuthGuard],
    children: [
      { path: 'cars', component: CarManagementComponent },
      { path: 'users', component: UserManagementComponent },
      { path: 'bookings', component: BookingManagementComponent },
      { path: '', redirectTo: 'cars', pathMatch: 'full' } // Default child route
    ]
  },

  // User Routes (Parent-Child Structure)
  { 
    path: 'user', 
    component: UserDashboardComponent, 
    canActivate: [AuthGuard],
    children: [
      {path:'Home',component:HomeCompComponent},
   {path:'About',component:AboutComponent},
   {path:'Contact',component:ContactComponent},
      { path: 'Cars', component: DisplayCarsComponent },
      { path: 'MyBookings', component: MybookingsComponent },
      { path: 'Profile', component: UserProfileComponent },
      { path: '', redirectTo: 'cars', pathMatch: 'full' } // Default child route
    ]
  },

 // Authentication Routes

 { path: 'user/login', component: UserLoginComponent },

 // Wildcard Route - Redirect unknown paths to login
 { path: '**', redirectTo: 'user/login', pathMatch: 'full' }
 

];

