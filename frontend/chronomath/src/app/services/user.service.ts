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
    this.checkLoginStatus();
  }

  checkLoginStatus(): void {
    const token = localStorage.getItem('authToken');
  
    if (token) {
      this.loggedInSubject.next(true);
      console.log('checkLoginStatus: User is logged in.');
  
      const userEmail = localStorage.getItem('userEmail');
      const userName = localStorage.getItem('userName');
      console.log(`User details: Email = ${userEmail}, Name = ${userName}`);
    } else {
      this.loggedInSubject.next(false);
      console.log('checkLoginStatus: User is NOT logged in.');
    }
  }
  
  logout(): Promise<void> {
    return fetch('http://localhost:4769/auth/logout', { method: 'POST' })
      .then(response => {
        if (!response.ok) {
          throw new Error('Logout failed');
        }
  
        localStorage.removeItem('authToken');
        localStorage.removeItem('userEmail');
        localStorage.removeItem('userName');
  
        this.loggedInSubject.next(false);
  
        console.log('User has logged out. isLoggedIn = false');
      });
  }
  
  setLoggedIn(value: boolean): void {
    this.loggedInSubject.next(value);
  }
}
