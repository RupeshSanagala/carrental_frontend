import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { NgModel,FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-user-profile',
  imports:[FormsModule,CommonModule],
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent {
  // user: any = {};

  // constructor(private userService: UserService) {}

  // ngOnInit(): void {
  //   this.getUserProfile();
  // }

  // getUserProfile() {
  //   this.userService.getUser().subscribe({
  //     next: (response) => {
  //       this.user = response;
  //     },
  //     error: (err) => console.error('Error fetching user profile:', err)
  //   });
  // }

  // updateProfile() {
  //   this.userService.updateUser(this.user).subscribe({
  //     next: () => alert('Profile updated successfully!'),
  //     error: (err) => console.error('Error updating profile:', err)
  //   });
  // }
}

