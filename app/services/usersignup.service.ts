import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsersignupService {
  private apiUrl = 'http://localhost:5217/api/users'; // Update with your actual backend URL

  constructor(private http: HttpClient) { }

  // ✅ Register User
  registerUser(userData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, userData);
  }
}
