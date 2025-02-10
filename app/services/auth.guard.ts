import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot): boolean {
    const token = localStorage.getItem('token'); // ✅ Check token
    const role = localStorage.getItem('role'); // ✅ Check role
    const username = localStorage.getItem('username'); //check username

    console.log('AuthGuard:', { token, role, username }); // ✅ Debugging

    if (!token) {
      console.log('No token found. Redirecting to login...');
      this.router.navigate(['/user/login']); // Redirect to login if not authenticated
      return false;
    }

    const requestedPath = route.url[0]?.path; // Get first segment of route (e.g., 'admin' or 'user')

    // ✅ Check if role matches the requested route
    if (role === 'Admin' && requestedPath !== 'admin') {
      console.log('Unauthorized: Admin trying to access non-admin route.');
      this.router.navigate(['/admin']); // Redirect admins to admin panel
      return false;
    }
    if (role === 'User' && requestedPath !== 'user') {
      console.log('Unauthorized: User trying to access admin route.');
      this.router.navigate(['/user']); // Redirect users to user panel
      return false;
    }

    return true;
  }
}
