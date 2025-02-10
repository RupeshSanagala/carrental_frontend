import { Component, OnInit } from '@angular/core';
import { Router,RouterModule} from '@angular/router';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  imports:[RouterModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Car Rental App';

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {
    this.redirectUser();
  }

  // ✅ Redirect based on role after login
  redirectUser() {
    const role = this.authService.getUserRole(); // Get stored role
    if (role === 'Admin') {
      this.router.navigate(['/admin']);  // Redirect Admin
    } else if (role === 'User') {
      this.router.navigate(['/user']);  // Redirect User
    } else {
      this.router.navigate(['/user/login']);  // Redirect to login if no valid role
    }
  }

  // ✅ Logout functionality
  logout() {
    this.authService.logout();
    this.router.navigate(['/user/login']);
  }
}






