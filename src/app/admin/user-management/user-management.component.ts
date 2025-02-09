import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

export interface User {
  userId: number; // ✅ Updated field name
  username: string;
  email: string;
  password?: string; // ✅ Optional, only required when creating a new user
  address: string;
  phoneNumber: string; // ✅ Updated field name
  role: string; // "User" or "Admin"
  isActive: boolean;
  bookings?: number[]; // ✅ Added optional bookings reference
}

@Component({
  selector: 'app-user-management',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.css']
})
export class UserManagementComponent implements OnInit {
  users: User[] = [];
  selectedUser: User | null = null;

  // ✅ Updated to match the backend structure
  newUser: User = { 
    userId: 0, 
    username: '', 
    email: '', 
    password: 'Default@123', // ✅ Added default password
    address: '', 
    phoneNumber: '', 
    role: 'User', 
    isActive: true 
  };

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.loadUsers();
  }

  // ✅ Fetch all users
  loadUsers(): void {
    this.userService.getUsers().subscribe(users => {
      this.users = users;
    });
  }

  // ✅ Add a new user
  addUser(): void {
    this.userService.addUser(this.newUser).subscribe({
      next: () => {
        this.loadUsers();
        this.newUser = { 
          userId: 0, 
          username: '', 
          email: '', 
          password: 'Default@123', 
          address: '', 
          phoneNumber: '', 
          role: 'User', 
          isActive: true 
        };
      },
      error: (err) => {
        console.error('Error adding user:', err);
        alert('Failed to add user. Check console for details.');
      }
    });
  }

  // ✅ Edit a user
  editUser(user: User): void {
    this.selectedUser = { ...user };
  }

  // ✅ Update user details
  updateUser(): void {
    if (this.selectedUser) {
      this.userService.updateUser(this.selectedUser.userId, this.selectedUser).subscribe(() => {
        this.loadUsers();
        this.selectedUser = null;
      });
    }
  }

  // ✅ Delete user
  deleteUser(id: number): void {
    this.userService.deleteUser(id).subscribe(() => {
      this.loadUsers();
    });
  }

  // ✅ Reset user password
  resetPassword(user: User): void {
    const newPassword = prompt(`Enter new password for ${user.username}:`);
    if (newPassword) {
      this.userService.resetUserPassword(user.userId, newPassword).subscribe(() => {
        alert('Password reset successfully!');
      });
    }
  }

  // ✅ Toggle user active/inactive
  toggleStatus(user: User): void {
    user.isActive = !user.isActive;
    this.userService.toggleUserStatus(user.userId, user.isActive).subscribe(() => {
      this.loadUsers();
    });
  }

  // ✅ Assign Role (Admin/User)
  assignRole(user: User, role: string): void {
    this.userService.assignRole(user.userId, role).subscribe(() => {
      this.loadUsers();
    });
  }
}
