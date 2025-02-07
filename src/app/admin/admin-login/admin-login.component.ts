import { Component, inject } from '@angular/core';
import { AdminService } from '../../services/admin.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router'; // ✅ Import Router

@Component({
  selector: 'app-admin-login',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.css']
})
export class AdminLoginComponent {
  private adminService = inject(AdminService);
  private router = inject(Router); // ✅ Inject Router

  email = '';
  password = '';

  onSubmit() {
    this.adminService.login(this.email, this.password).subscribe({
      next: (response) => {
        console.log('Login successful', response);
        localStorage.setItem('adminToken', response.token);
        this.router.navigate(['/admin/dashboard']); // ✅ Navigate on success
      },
      error: (error) => {
        console.error('Login failed', error);
      }
    });
  }
  
}

