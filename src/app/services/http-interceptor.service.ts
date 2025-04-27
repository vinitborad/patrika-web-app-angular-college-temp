import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable()
export class HttpInterceptorService implements HttpInterceptor {
  constructor(private authService: AuthService, private router: Router) { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    // Clone the request to add the new header
    let authReq = request.clone({
      setHeaders: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      }
    });

    // Add auth token if available
    if (this.authService.isAuthenticated) {
      const token = 'dummy-jwt-token'; // In a real app, this would come from the auth service
      if (token) {
        authReq = authReq.clone({
          setHeaders: {
            ...authReq.headers,
            Authorization: `Bearer ${token}`
          }
        });
      }
    }

    // Pass on the cloned request instead of the original request
    return next.handle(authReq).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401) {
          // Unauthorized - redirect to login
          this.authService.signOut();
          this.router.navigate(['/auth']);
        } else if (error.status === 403) {
          // Forbidden - user doesn't have necessary permissions
          this.router.navigate(['/']);
        }
        return throwError(() => error);
      })
    );
  }
}