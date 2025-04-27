import { Injectable } from '@angular/core';

export type NotificationType = 'success' | 'error' | 'info' | 'warning';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor() { }

  /**
   * Show a notification to the user
   * In a real app, this would use a UI library like ngx-toastr or similar
   */
  show(message: string, type: NotificationType = 'info', duration: number = 3000): void {
    // For now, we'll use console and alert as a simple implementation
    console.log(`[${type.toUpperCase()}]: ${message}`);

    // In a production app, you would use a proper toast/notification component
    if (type === 'error') {
      alert(`Error: ${message}`);
    } else if (type === 'success') {
      alert(`Success: ${message}`);
    }

    // In a real implementation, you would:
    // - Create a notification component
    // - Add it to the view
    // - Remove it after the specified duration
  }

  success(message: string, duration?: number): void {
    this.show(message, 'success', duration);
  }

  error(message: string, duration?: number): void {
    this.show(message, 'error', duration);
  }

  info(message: string, duration?: number): void {
    this.show(message, 'info', duration);
  }

  warning(message: string, duration?: number): void {
    this.show(message, 'warning', duration);
  }
}