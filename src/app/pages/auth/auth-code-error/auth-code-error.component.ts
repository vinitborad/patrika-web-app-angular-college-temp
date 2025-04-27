import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-auth-code-error',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './auth-code-error.component.html',
  styleUrls: ['./auth-code-error.component.scss']
})
export class AuthCodeErrorComponent { }