import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [FormsModule, HttpClientModule, RouterLink],
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
    this.http.post('https://chronoapi.duckdns.org/auth/register', this.signupData)
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


/*

<!-- "Or continue with" separator -->
      <div class="mt-6 flex items-center" aria-hidden="true">
        <div class="flex-grow border-t border-[var(--secondary-color)]"></div>
        <span class="mx-2 text-[var(--text-color)] opacity-70">Or continue with</span>
        <div class="flex-grow border-t border-[var(--secondary-color)]"></div>
      </div>

      <!-- Google Button (single column, w-full) -->
      <div class="mt-6">
        <button
          type="button"
          aria-label="Sign up with Google button"
          class="flex w-full items-center justify-center gap-2 
                 rounded-md border border-[var(--secondary-color)] 
                 bg-[var(--bg-color)] py-2 text-sm font-medium 
                 text-[var(--text-color)] shadow-sm 
                 hover:bg-[var(--secondary-color)] focus:outline-none 
                 focus:ring-2 focus:ring-[var(--primary-color)] focus:ring-offset-2"
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
            <path
              d="M15.545 6.558a9.4 9.4 0 0 1 .139 1.626c0 2.434-.87 
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