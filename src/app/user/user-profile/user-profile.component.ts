import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ProfileService } from './../../services/profile.service';
import { AuthService } from './../../services/auth.service';
import { HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-user-profile',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  profileForm: FormGroup;
  userProfile: any;
  isEditing = false; // Track edit mode
  successMessage = '';

  constructor(
    private fb: FormBuilder,
    private profileService: ProfileService,
    private authService: AuthService
  ) {
    this.profileForm = this.fb.group({
      fullName: ['', Validators.required],
      email: [{ value: '', disabled: true }, [Validators.required, Validators.email]],
      phone: ['', Validators.required]
    });
  }

  ngOnInit() {
    this.loadUserProfile();
  }

  loadUserProfile() {
    const token = this.authService.getToken(); // Get token

    if (!token) {
      console.error('No authentication token found');
      return;
    }

    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    this.profileService.getUserProfile(headers).subscribe(
      (response: any) => {
        this.userProfile = response;

        // Pre-fill the form with user data
        this.profileForm.patchValue({
          fullName: response.fullName,
          email: response.email,
          phone: response.phone
        });
      },
      (error: any) => {
        console.error('Error loading user profile:', error);
      }
    );
  }

  enableEdit() {
    this.isEditing = true;
    this.profileForm.get('fullName')?.enable();
    this.profileForm.get('phone')?.enable();
  }

  updateProfile() {
    if (this.profileForm.valid) {
      this.profileService.updateUserProfile(this.profileForm.value).subscribe(
        response => {
          this.successMessage = 'Profile updated successfully!';
          this.isEditing = false;
          this.loadUserProfile(); // Reload data after update
        },
        error => {
          console.error('Error updating profile:', error);
        }
      );
    }
  }

  cancelEdit() {
    this.isEditing = false;
    this.loadUserProfile();
  }
}
