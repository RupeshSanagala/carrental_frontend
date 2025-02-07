import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterOutlet } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { RouterModule } from '@angular/router';


@Component({
  selector: 'app-root',
  standalone: true, 
  imports: [CommonModule,RouterModule], // ✅ Ensure HttpClientModule is imported
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent  {
  constructor(private router: Router) {} // ✅ Inject Router

  logout() {
    localStorage.removeItem('adminToken'); // ✅ Clear token
    this.router.navigate(['/admin/login']); // ✅ Redirect to login
  }
}





