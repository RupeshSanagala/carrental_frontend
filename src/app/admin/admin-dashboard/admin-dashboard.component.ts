import { AuthService } from './../../services/auth.service';
import { Router,RouterModule } from '@angular/router';
import { Component, OnInit,Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-admin-dashboard',
  imports:[RouterModule],
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit {

  adminName: string = '';

  constructor(@Inject(PLATFORM_ID) private platformId: object, private router: Router,private authService: AuthService) {}
  ngOnInit(): void {
    this.adminName = localStorage.getItem('username') || 'Admin';
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/user/login']);
  }
}


