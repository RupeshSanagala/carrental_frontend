import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../admin/user-management/user-management.component';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'http://localhost:5217/api/admin/users'; // ✅ Updated to match backend

  constructor(private http: HttpClient) {}

  // ✅ Get all users
  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.apiUrl);
  }

  // ✅ Get user by ID
  getUserById(id: number): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/${id}`);
  }

  // ✅ Add new user
  addUser(user: User): Observable<User> {
    return this.http.post<User>(this.apiUrl, user);
  }

  // ✅ Update user details
  updateUser(id: number, user: User): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/${id}`, user);
  }

  // ✅ Delete user
  deleteUser(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  // ✅ Reset user password
  resetUserPassword(id: number, newPassword: string): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/${id}/reset-password`, newPassword);
  }

  // ✅ Toggle user active/inactive status
  toggleUserStatus(id: number, isActive: boolean): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/${id}/status`, {});
  }

  // ✅ Assign Role (Admin/User)
  assignRole(id: number, role: string): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/${id}/role`, role);
  }

  
}
