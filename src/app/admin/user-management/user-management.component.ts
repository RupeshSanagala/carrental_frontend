import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

export interface User {
  user_ID: number;
  username: string;
  email: string;
  address: string;
  phone_Number: string;
  bookingIds: number[];
  isActive: boolean;
  role: string; // "User" or "Admin"
}

@Component({
  selector: 'app-user-management',
  imports:[CommonModule,FormsModule],
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.css']
})
export class UserManagementComponent implements OnInit {
  users: User[] = [];
  selectedUser: User | null = null;
  newUser: User = { user_ID: 0, username: '', email: '', address: '', phone_Number: '', bookingIds: [], isActive: true, role: 'User' };

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(): void {
    this.userService.getUsers().subscribe(users => {
      this.users = users;
    });
  }

  addUser(): void {
    this.userService.addUser(this.newUser).subscribe(() => {
      this.loadUsers();
      this.newUser = { user_ID: 0, username: '', email: '', address: '', phone_Number: '', bookingIds: [], isActive: true, role: 'User' };
    });
  }

  editUser(user: User): void {
    this.selectedUser = { ...user };
  }

  updateUser(): void {
    if (this.selectedUser) {
      this.userService.updateUser(this.selectedUser.user_ID, this.selectedUser).subscribe(() => {
        this.loadUsers();
        this.selectedUser = null;
      });
    }
  }

  deleteUser(id: number): void {
    this.userService.deleteUser(id).subscribe(() => {
      this.loadUsers();
    });
  }

  resetPassword(user: User): void {
    const newPassword = prompt(`Enter new password for ${user.username}:`);
    if (newPassword) {
      this.userService.resetUserPassword(user.user_ID, newPassword).subscribe(() => {
        alert('Password reset successfully!');
      });
    }
  }

  toggleStatus(user: User): void {
    user.isActive = !user.isActive;
    this.userService.toggleUserStatus(user.user_ID, user.isActive).subscribe(() => {
      this.loadUsers();
    });
  }

  assignRole(user: User, role: string): void {
    this.userService.assignRole(user.user_ID, role).subscribe(() => {
      this.loadUsers();
    });
  }
}
