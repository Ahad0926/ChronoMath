import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-profile',
  standalone: true,
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit {
  userEmail: string = '';
  userName: string = '';

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    // Fetch user data from localStorage or userService
    this.userEmail = localStorage.getItem('userEmail') || '';
    this.userName = localStorage.getItem('userName') || 'Unknown';
  }

  onForgotPassword(): void {
    console.log('Forgot password clicked!');
  }
}
