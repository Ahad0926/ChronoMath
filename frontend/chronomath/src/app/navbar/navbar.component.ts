// navbar.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  isLoggedIn = false;

  constructor(private UserService: UserService) {}

  ngOnInit(): void {
    // Whenever UserService updates "isLoggedIn$", we update our local isLoggedIn
    this.UserService.isLoggedIn$.subscribe(status => {
      this.isLoggedIn = status;
    });
  }

  // Call the logout method in UserService
  logout(): void {
    this.UserService.logout().catch(error => console.error(error));
  }
}
