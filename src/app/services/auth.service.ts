import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Router } from '@angular/router';

export interface User {
  id: string;
  email: string;
  fullName: string;
  avatarUrl?: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUserSubject = new BehaviorSubject<User | null>(null);
  public currentUser$: Observable<User | null> = this.currentUserSubject.asObservable();
  private isAuthenticatedSubject = new BehaviorSubject<boolean>(false);
  public isAuthenticated$ = this.isAuthenticatedSubject.asObservable();

  constructor(private router: Router) {
    // Check for user in local storage on initialization
    this.loadUserFromStorage();
  }

  private loadUserFromStorage(): void {
    const storedUser = localStorage.getItem('patrika_user');
    if (storedUser) {
      const user = JSON.parse(storedUser);
      this.currentUserSubject.next(user);
      this.isAuthenticatedSubject.next(true);
    }
  }

  public get currentUserValue(): User | null {
    return this.currentUserSubject.value;
  }

  public get isAuthenticated(): boolean {
    return this.isAuthenticatedSubject.value;
  }

  /**
   * Signs in with Google OAuth
   * In a real implementation, this would redirect to Google OAuth
   */
  signInWithGoogle(): Promise<void> {
    return new Promise((resolve) => {
      // In a real application, this would be an API call to sign in with Google
      // For demo purposes, we'll simulate a successful sign-in after a delay
      setTimeout(() => {
        const mockUser: User = {
          id: 'user_' + Math.random().toString(36).substr(2, 9),
          email: 'user@example.com',
          fullName: 'Demo User',
          avatarUrl: 'https://ui-avatars.com/api/?name=Demo+User'
        };

        // Store user in local storage
        localStorage.setItem('patrika_user', JSON.stringify(mockUser));

        // Update subjects
        this.currentUserSubject.next(mockUser);
        this.isAuthenticatedSubject.next(true);

        resolve();
      }, 1500);
    });
  }

  /**
   * Signs out the current user
   */
  signOut(): void {
    // Clear local storage
    localStorage.removeItem('patrika_user');

    // Update subjects
    this.currentUserSubject.next(null);
    this.isAuthenticatedSubject.next(false);

    // Navigate to home
    this.router.navigate(['/']);
  }
}