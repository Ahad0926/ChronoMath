// navbar.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
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

  constructor(private UserService: UserService, private router: Router) {}

  ngOnInit(): void {
    // Whenever UserService updates "isLoggedIn$", we update our local isLoggedIn
    this.UserService.isLoggedIn$.subscribe(status => {
      this.isLoggedIn = status;
      console.log(`NavbarComponent detected login status change: ${status}`);
    
      if (status) {
        const email = localStorage.getItem('userEmail');
        const name = localStorage.getItem('userName');
        console.log(`Navbar User Info: Email = ${email}, Name = ${name}`);
      }
    });
    
  }

  logout(): void {
    this.UserService.logout().then(() => {
      console.log('NavbarComponent: User logged out');
      this.router.navigate(['/']);
    }).catch(error => console.error('NavbarComponent: Logout error', error));
  }
}
