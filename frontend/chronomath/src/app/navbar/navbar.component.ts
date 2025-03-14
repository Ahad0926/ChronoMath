import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { UserService } from '../services/user.service';
import { ThemeService } from '../services/theme.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  isLoggedIn = false;
  userName: string = '';
  showThemeDropdown = false;
  showUserDropdown = false;

  constructor(
    private UserService: UserService,
    private router: Router,
    private themeService: ThemeService
  ) {}

  ngOnInit(): void {
    this.UserService.isLoggedIn$.subscribe(status => {
      this.isLoggedIn = status;
      if (status) {
        this.userName = localStorage.getItem('userName') || 'User';
      }
    });
  }

  logout(): void {
    this.UserService.logout().then(() => {
      console.log('NavbarComponent: User logged out');
      this.router.navigate(['/']);
    }).catch(error => console.error('NavbarComponent: Logout error', error));
  }

  toggleThemeDropdown(): void {
    this.showThemeDropdown = !this.showThemeDropdown;
    this.showUserDropdown = false; // Close user menu when opening theme menu
  }

  toggleUserDropdown(): void {
    this.showUserDropdown = !this.showUserDropdown;
    this.showThemeDropdown = false; // Close theme menu when opening user menu
  }

  setTheme(theme: string): void {
    this.themeService.applyTheme(theme);
    this.showThemeDropdown = false;
  }

  goToProfile(): void {
    this.router.navigate(['/profile']);
    this.showUserDropdown = false;
  }
}
