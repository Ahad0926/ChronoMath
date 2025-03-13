import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [FormsModule, HttpClientModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent {
  // Data bound to the signup form fields
  signupData = {
    email: '',
    password: '',
    name: ''
  };

  constructor(private http: HttpClient, private router: Router) {}

  onSubmit() {
    // Make a POST request to your Flask register endpoint
    this.http.post('http://localhost:4123/auth/register', this.signupData)
      .subscribe({
        next: (response: any) => {
          console.log('Registration successful:', response);
          // e.g., store token or navigate to a different page
          // localStorage.setItem('token', response.token);
          this.router.navigate(['/login']);
        },
        error: (err) => {
          console.error('Registration failed:', err);
          // Display error to the user as needed
          alert('Error during signup. Please try again, and keep in mind to include:\n 1. At least one lowercase letter \n 2. At least one uppercase letter \n 3. At least one digit \n 4. At least one special character \n 5. Minimum password length of 6 characters');
        }
      });
  }
}


