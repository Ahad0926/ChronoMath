import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

import { UserService } from '../services/user.service';

@Component({
  selector: 'app-login',
  imports: [FormsModule, HttpClientModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})

export class LoginComponent {
  email: string = '';
  password: string = '';

  constructor(private http: HttpClient, private router: Router, private UserService: UserService) {}

  onSubmit() {
    const loginData = {
      email: this.email,
      password: this.password
    };
  
    this.http.post('http://localhost:4769/auth/login', loginData)
      .subscribe({
        next: (response: any) => {
          console.log('Login successful:', response);
  
          // Set token and email (already correct)
          localStorage.setItem('authToken', response.token);
          localStorage.setItem('userEmail', this.email);
          localStorage.setItem('userName', response.name);
  
          // Mark as logged in
          this.UserService.setLoggedIn(true);
          console.log(`Logged in as:\n${response.email}\n${response.name}`);

          // Navigate to timeline
          this.router.navigate(['/timeline']);
        },
        error: (err) => {
          console.error('Login failed:', err);
          alert('Login failed. Please check your credentials.');
        }
      });
  }  

  onForgotPassword() {
    // Use the same "email" model from your login form
    const forgotData = { email: this.email };

    this.http.post('http://localhost:4769/auth/forgot-password', forgotData)
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

