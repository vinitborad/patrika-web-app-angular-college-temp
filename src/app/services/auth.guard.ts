import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard {
  constructor(private authService: AuthService, private router: Router) { }

  canActivate(): boolean {
    // Temporarily return true to allow access to all routes
    return true;

    // Original authentication check (commented out)
    /*
    if (this.authService.isAuthenticated) {
      return true;
    } else {
      this.router.navigate(['/auth']);
      return false;
    }
    */
  }
}