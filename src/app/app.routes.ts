import { Routes } from '@angular/router';
import { AuthGuard } from './services/auth.guard';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/landing/landing.component').then(mod => mod.LandingComponent)
  },
  {
    path: 'auth',
    loadComponent: () => import('./pages/auth/auth.component').then(mod => mod.AuthComponent)
  },
  {
    path: 'auth/auth-code-error',
    loadComponent: () => import('./pages/auth/auth-code-error/auth-code-error.component').then(mod => mod.AuthCodeErrorComponent)
  },
  {
    path: 'home',
    loadComponent: () => import('./pages/user/home/home.component').then(mod => mod.HomeComponent),
    canActivate: [AuthGuard]
  },
  {
    path: 'new-order',
    loadComponent: () => import('./pages/user/new-order/new-order.component').then(mod => mod.NewOrderComponent),
    canActivate: [AuthGuard]
  },
  {
    path: 'order-details/:id',
    loadComponent: () => import('./pages/user/order-details/order-details.component').then(mod => mod.OrderDetailsComponent),
    canActivate: [AuthGuard]
  },
  {
    path: 'open/terms-and-conditions',
    loadComponent: () => import('./pages/open/terms-and-conditions/terms-and-conditions.component').then(mod => mod.TermsAndConditionsComponent)
  },
  {
    path: 'open/pricing-policy',
    loadComponent: () => import('./pages/open/pricing-policy/pricing-policy.component').then(mod => mod.PricingPolicyComponent)
  },
  {
    path: 'open/delete-account',
    loadComponent: () => import('./pages/open/delete-account/delete-account.component').then(mod => mod.DeleteAccountComponent)
  },
  {
    path: 'open/printers-locations',
    loadComponent: () => import('./pages/open/printers-locations/printers-locations.component').then(mod => mod.PrintersLocationsComponent)
  },
  {
    path: '**',
    redirectTo: ''
  }
];
