import { AuthService } from './../../services/auth.service';
import {Router, RouterModule } from '@angular/router';
import { Component} from '@angular/core';

@Component({
  selector: 'app-user-dashboard',
  imports:[RouterModule],
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.css']
})
export class UserDashboardComponent  {

  username: string = 'Rupesh'; // Replace with dynamic user data
  dropdownOpen = false;

  constructor(private authService: AuthService, private router: Router) {
    const storedUser = this.authService.getUserName(); // Get from localStorage
    if (storedUser) {
      this.username = storedUser;
    }
  }

  toggleDropdown() {
    this.dropdownOpen = !this.dropdownOpen;
  }

  logout() {
    localStorage.clear();
    window.location.href = 'user/login';
  }
}

