import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { OrderService, Order } from '../../../services/order.service';
import { Subscription } from 'rxjs';
import { TopBarComponent } from '../../../components/top-bar/top-bar.component';
import { ContactAndLocationComponent } from '../../../components/contact-and-location/contact-and-location.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule, TopBarComponent, ContactAndLocationComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {
  activeOrders: Order[] = [];
  private orderSubscription: Subscription | null = null;

  constructor(private orderService: OrderService) { }

  ngOnInit(): void {
    this.orderSubscription = this.orderService.getActiveOrders().subscribe(orders => {
      this.activeOrders = orders;
    });
  }

  ngOnDestroy(): void {
    if (this.orderSubscription) {
      this.orderSubscription.unsubscribe();
    }
  }
}