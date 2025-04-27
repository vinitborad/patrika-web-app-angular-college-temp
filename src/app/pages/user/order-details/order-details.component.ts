import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, ActivatedRoute, Router } from '@angular/router';
import { OrderService, Order } from '../../../services/order.service';
import { TopBarComponent } from '../../../components/top-bar/top-bar.component';
import { LoadingIndicatorComponent } from '../../../components/loading-indicator/loading-indicator.component';
import { NotificationService } from '../../../services/notification.service';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-order-details',
  standalone: true,
  imports: [CommonModule, RouterModule, TopBarComponent, LoadingIndicatorComponent],
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.scss']
})
export class OrderDetailsComponent implements OnInit {
  orderId: string = '';
  orderDetails: Order | null = null;
  isLoading = true;

  constructor(
    private route: ActivatedRoute,
    private orderService: OrderService,
    private router: Router,
    private notificationService: NotificationService
  ) { }

  ngOnInit(): void {
    this.route.params.pipe(
      switchMap(params => {
        this.orderId = params['id'];
        this.isLoading = true;
        return this.orderService.getOrderDetails(this.orderId);
      })
    ).subscribe({
      next: (order) => {
        this.orderDetails = order;
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error fetching order details:', error);
        this.notificationService.error('Failed to load order details. Please try again later.');
        this.isLoading = false;
      }
    });
  }

  cancelOrder(): void {
    if (!this.orderDetails) return;

    if (confirm('Are you sure you want to cancel this order?')) {
      this.orderService.cancelOrder(this.orderDetails.id).subscribe({
        next: (success) => {
          if (success) {
            this.notificationService.success('Order cancelled successfully!');
            // Refresh order details
            this.ngOnInit();
          } else {
            this.notificationService.error('Failed to cancel order. Please try again.');
          }
        },
        error: (error) => {
          console.error('Error cancelling order:', error);
          this.notificationService.error('There was an error cancelling your order. Please try again.');
        }
      });
    }
  }
}