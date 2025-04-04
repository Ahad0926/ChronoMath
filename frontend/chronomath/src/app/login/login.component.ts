import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

import { UserService } from '../services/user.service';

@Component({
  selector: 'app-login',
  imports: [FormsModule, HttpClientModule, RouterLink],
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
          localStorage.setItem('uuid', response.uuid);

  
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

/*

<!-- "Or continue with" separator -->
      <div class="mt-6 flex items-center" aria-hidden="true">
        <div class="flex-grow border-t" style="border-color: var(--secondary-color);"></div>
        <span class="mx-2" style="color: var(--secondary-color);">Or continue with</span>
        <div class="flex-grow border-t" style="border-color: var(--secondary-color);"></div>
      </div>

      <!-- Google Button (single column, w-full) -->
      <div class="mt-6">
        <button
          type="button"
          aria-label="Login with Google button"
          class="w-full py-2 border rounded-md flex items-center justify-center gap-2
                 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2"
          style="
            background-color: var(--bg-color);
            color: var(--text-color);
            border-color: var(--secondary-color);
          "
        >
          <!-- Google icon -->
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            class="bi bi-google"
            viewBox="0 0 16 16"
            aria-hidden="true"
          >
            <path d="M15.545 6.558a9.4 9.4 0 0 1 .139 1.626c0 2.434-.87 
              4.492-2.384 5.885h.002C11.978 15.292 10.158 16 8 16A8 
              8 0 1 1 8 0a7.7 7.7 0 0 1 5.352 2.082l-2.284 
              2.284A4.35 4.35 0 0 0 8 3.166c-2.087 0-3.86 
              1.408-4.492 3.304a4.8 4.8 0 0 0 0 
              3.063h.003c.635 1.893 2.405 3.301 4.492 
              3.301 1.078 0 2.004-.276 2.722-.764h-.003a3.7 
              3.7 0 0 0 1.599-2.431H8v-3.08z"
            />
          </svg>
          Google
        </button>
      </div>

*/