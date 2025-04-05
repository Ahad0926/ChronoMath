import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-profile',
  standalone: true,
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit {
  userEmail: string = '';
  userName: string = '';

  constructor(private userService: UserService, private http: HttpClient) {}

  ngOnInit(): void {
    // Fetch user data from localStorage or userService
    this.userEmail = localStorage.getItem('userEmail') || '';
    this.userName = localStorage.getItem('userName') || 'Unknown';
  }

  onForgotPassword() {
    this.http.post('https://chronoapi.duckdns.org/auth/forgot-password', this.userEmail)
      .subscribe({
        next: (res: any) => {
          console.log('Password reset email sent:', res);
          alert('Password reset email sent. Please check your inbox.');
        },
        error: (err) => {
          console.error('Password reset failed:', err);
          alert('Could not send password reset email. Please try again later.');
        }
      });
  }
}
