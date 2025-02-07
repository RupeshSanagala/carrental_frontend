import { Component,OnInit} from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { CarManagementComponent } from '../car-management/car-management.component';
// import { AuthService } from '../../services/auth.service';
@Component({
  selector: 'app-admin-dashboard',
  imports:[RouterOutlet],
  templateUrl: './admin-dashboard.component.html',
  styleUrl: './admin-dashboard.component.css'
})
export class AdminDashboardComponent  {
  // constructor(private authService: AuthService, private router: Router) {}

  // ngOnInit(): void {
  //   if (!this.authService.isAdminLoggedIn()) {
  //     this.router.navigate(['/login']); // Redirect to login if not logged in
  //   }
  // }

  // logout(): void {
  //   this.authService.logout();
  // }
}

