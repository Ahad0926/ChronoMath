import { Component } from '@angular/core';

@Component({
  selector: 'app-profile',
  imports: [],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent {
  constructor() { }

  // Trigger your password reset logic here
  onForgotPassword(): void {
    // e.g., navigate to a password reset page, open a modal, etc.
    console.log('Forgot password clicked!');
  }
}

