import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [FormsModule, HttpClientModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})

export class LoginComponent {
  email: string = '';
  password: string = '';

  constructor(private http: HttpClient, private router: Router) {}

  onSubmit() {
    // Create the request body
    const loginData = {
      email: this.email,
      password: this.password
    };

    // Send POST request to the Flask backend
    this.http.post('http://localhost:4769/auth/login', loginData)
      .subscribe({
        next: (response: any) => {
          console.log('Login successful:', response);
          // Example: store token if returned by Flask
          // localStorage.setItem('token', response.token);
          // Navigate to another page or show success message
          this.router.navigate(['/timeline'])
        },
        error: (err) => {
          console.error('Login failed:', err);
          // Handle error (e.g., show error message to the user)
          alert('Login failed. Please check your credentials.');
        }
      });
  }
}

