import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-contact-and-location',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './contact-and-location.component.html',
  styleUrls: ['./contact-and-location.component.scss']
})
export class ContactAndLocationComponent {
  // Phone number for bulk orders
  readonly bulkOrderPhone = '9426920146';
}