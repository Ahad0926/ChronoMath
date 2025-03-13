import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { UserService } from './services/user.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class RedirectIfLoggedInGuard implements CanActivate {
  constructor(private userService: UserService, private router: Router) {}

  canActivate(): Observable<boolean> {
    return this.userService.isLoggedIn$.pipe(
      map((isLoggedIn) => {
        if (isLoggedIn) {
          this.router.navigate(['/timeline']); // Redirect to timeline if logged in
          return false; // Prevent access to the route
        }
        return true; // Allow access if not logged in
      })
    );
  }
}
