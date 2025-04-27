import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

interface PrinterLocation {
  id: string;
  name: string;
  address: string;
  mapUrl: string;
  hours: string;
}

@Component({
  selector: 'app-printers-locations',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './printers-locations.component.html',
  styleUrls: ['./printers-locations.component.scss']
})
export class PrintersLocationsComponent {
  locations: PrinterLocation[] = [
    {
      id: '1',
      name: 'Paan Aroma Family Pan and Mocktail Cafe',
      address: 'SHOP NO G.F. 1, M Square, b/h CITY CENTER, Swastik Society, Navrangpura',
      mapUrl: 'https://maps.app.goo.gl/zCiJQ1zGNj3KZzid7',
      hours: 'Mon-Sat: 10:00 AM - 9:00 PM, Sun: 11:00 AM - 7:00 PM'
    },
    {
      id: '2',
      name: 'City Center Mall',
      address: 'Ground Floor, City Center Mall, Near University Road, Ahmedabad',
      mapUrl: 'https://maps.app.goo.gl/',
      hours: 'Mon-Sun: 10:00 AM - 10:00 PM'
    }
  ];
}