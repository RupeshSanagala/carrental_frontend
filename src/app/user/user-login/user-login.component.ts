import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
 
import { StorageService } from '../../services/storage.service';
import { AuthService } from '../../services/auth.service';
// import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-user-login',
  imports:[FormsModule,CommonModule],
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.css']
})
export class UserLoginComponent {
 
  email: string = '';
  password: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  login() {
    this.authService.loginUser({ email: this.email, password: this.password }).subscribe(
      (response:any) => {
        // console.log('Login Successful!');  // ✅ Debugging
        // console.log('Token:', response.token);  // ✅ Check Token
        // console.log('Role:', response.role);  // ✅ Check Role

        // Store token and role
        this.authService.saveUserData(response.token, response.role, response.username);

        // ✅ Redirect based on Role
        if (response.role === 'Admin') {
          // console.log('Redirecting to /admin');
          this.router.navigate(['/admin']);
        } else {
          console.log('Redirecting to /user');
          this.router.navigate(['/user']);
        }
      },
      (error:any) => {
        alert('Login Failed. Please check your credentials.');
        console.error('Login Error:', error);
      }
    );
  }
  
}

