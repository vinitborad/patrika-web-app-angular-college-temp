import { Component } from '@angular/core';
import { HeroSectionComponent } from './components/hero-section/hero-section.component';
import { HowItWorksComponent } from './components/how-it-works/how-it-works.component';
import { BulkOrderComponent } from './components/bulk-order/bulk-order.component';
import { FeaturesSectionComponent } from './components/features-section/features-section.component';
import { LocationsSectionComponent } from './components/locations-section/locations-section.component';
import { FooterComponent } from './components/footer/footer.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [
    CommonModule,
    HeroSectionComponent,
    HowItWorksComponent,
    BulkOrderComponent,
    FeaturesSectionComponent,
    LocationsSectionComponent,
    FooterComponent
  ],
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss']
})
export class LandingComponent {
}