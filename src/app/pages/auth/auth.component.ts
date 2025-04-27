import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { LoadingIndicatorComponent } from '../../components/loading-indicator/loading-indicator.component';

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [CommonModule, RouterModule, LoadingIndicatorComponent],
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent {
  isLoading = false;

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  async signInWithGoogle(): Promise<void> {
    this.isLoading = true;
    try {
      await this.authService.signInWithGoogle();
      this.router.navigate(['/home']);
    } catch (error) {
      console.error('Error during sign-in:', error);
      this.router.navigate(['/auth/auth-code-error']);
    } finally {
      this.isLoading = false;
    }
  }
}