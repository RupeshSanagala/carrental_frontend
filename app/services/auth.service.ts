import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { JwtHelperService } from '@auth0/angular-jwt';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:5217/api/auth'; // Ensure this is the correct backend API URL
  private jwtHelper = new JwtHelperService();
  constructor(private http: HttpClient) {}

  // ✅ Login User and return an observable of {token, role}
  loginUser(credentials: { email: string; password: string }): Observable<{ token: string; role: string }> {
    return this.http.post<{ token: string; role: string }>(`${this.apiUrl}/login`, credentials)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          console.error('Login Error:', error);
          return throwError(() => new Error('Login failed. Please try again.'));
        })
      );
  }

  // ✅ Save token and role in localStorage
  saveUserData(token: string, role: string,username:string): void {
    localStorage.setItem('token', token);
    localStorage.setItem('role', role);
    localStorage.setItem('username',username);
  }

  // ✅ Get user role
  getUserRole(): string | null {
    return localStorage.getItem('role');
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }
  

  getUserName(): string | null {
    return localStorage.getItem('username'); // ✅ Retrieve username
  }

  getUserId(): number | null {
    const token = localStorage.getItem('token'); // Retrieve the token from localStorage
    if (!token) return null;

    const decodedToken = this.jwtHelper.decodeToken(token);
    return decodedToken ? decodedToken.userId : null; // Ensure this matches your backend token structure
  }


  // ✅ Logout user
  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
  }
}
