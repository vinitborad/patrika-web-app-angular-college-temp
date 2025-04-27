import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-pricing-policy',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './pricing-policy.component.html',
  styleUrls: ['./pricing-policy.component.scss']
})
export class PricingPolicyComponent { }