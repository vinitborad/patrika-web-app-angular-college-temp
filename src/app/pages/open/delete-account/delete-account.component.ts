import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-delete-account',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './delete-account.component.html',
  styleUrls: ['./delete-account.component.scss']
})
export class DeleteAccountComponent {
  email: string = '';
  reason: string = '';
  isSubmitting: boolean = false;

  submitRequest(): void {
    this.isSubmitting = true;
    // In a real application, this would send a request to the backend
    setTimeout(() => {
      alert('Your account deletion request has been submitted. We will process it within 48 hours.');
      this.isSubmitting = false;
      this.email = '';
      this.reason = '';
    }, 1500);
  }
}