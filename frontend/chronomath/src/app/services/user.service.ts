// auth.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class UserService {
  // "loggedInSubject" starts as false. 
  // Whenever the login state changes, we .next(...) a new value.
  private loggedInSubject = new BehaviorSubject<boolean>(false);
  private loginStatusChecked = false;

  // Components subscribe to this observable to know the current login state.
  isLoggedIn$ = this.loggedInSubject.asObservable();

  constructor() {
    // Optionally do an initial check when the service is created
    this.checkLoginStatus();
  }

  // Hit your Flask /isloggedin route to see if a session token exists
  checkLoginStatus(): void {
    const token = localStorage.getItem('authToken');
    this.loggedInSubject.next(!!token);
  }
  

  // Call Flask /logout (POST) to clear session. If successful, set loggedIn to false
  logout(): Promise<void> {
    return fetch('http://localhost:4769/auth/logout', { method: 'POST' })
      .then(response => {
        if (!response.ok) {
          throw new Error('Logout failed');
        }
        // On success, push 'false' to all subscribers
        this.loggedInSubject.next(false);
        
      });
  }

  // If you manually need to set the user as logged in (e.g., after a successful login fetch)
  setLoggedIn(value: boolean): void {
    this.loggedInSubject.next(value);
  }
}
