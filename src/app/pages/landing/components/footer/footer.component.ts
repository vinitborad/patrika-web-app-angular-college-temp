import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent {
  readonly PHONE_NUMBER = '9876543210';
  readonly EMAIL_ADDRESS = 'contact@patrikaprinters.com';
  readonly PRIVACY_POLICY_URL = 'https://www.privacypolicygenerator.info/live.php?token=aDGJ4JFQL1ExEJwgY8RM4Zl9g6cUgzLX';
  currentYear = new Date().getFullYear();
}