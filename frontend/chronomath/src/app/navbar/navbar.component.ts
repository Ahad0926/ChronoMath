import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
// import { NgIf } from '@angular/common';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})

export class NavbarComponent implements OnInit {
  isLoggedIn = false;

  ngOnInit(): void {
    this.checkLoginStatus();

    console.log(this.isLoggedIn);
    
  }

  // Check login status by calling /isloggedin
  checkLoginStatus(): void {
    console.log("is logged in navbar");
  
    fetch('/isloggedin', { method: 'GET'})
      .then(response => response.json())
      .then(data => {
        console.log('Login status response:', data); // ✅ LOG RESPONSE HERE
  
        // The Flask route returns { logged_in: boolean, email?: string }
        this.isLoggedIn = data.logged_in;
      })
      .catch(error => {
        console.error('Error checking login status:', error);
        this.isLoggedIn = false;
      });
  }

  // Log out by calling /logout (POST)
  logout(): void {
    fetch('/logout', { method: 'POST' })
      .then(response => {
        if (!response.ok) {
          throw new Error('Logout failed');
        }
        return response.json();
      })
      .then(data => {
        console.log('Logout success:', data);
        this.isLoggedIn = false;
      })
      .catch(error => {
        console.error(error);
      });
  }
}
