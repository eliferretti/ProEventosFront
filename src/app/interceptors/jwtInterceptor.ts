import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { AccountService } from '@app/services/account.service';
import { catchError, take } from 'rxjs/operators';
import { User } from '@app/models/identity/User';

@Injectable()
export class JwtInterceptor  implements HttpInterceptor {
  constructor(private accountService: AccountService) {}
  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    let currentUser: User;
    this.accountService.currentUser$.pipe(take(1)).subscribe(user => { 
      currentUser = user
      if (currentUser) {
        request = request.clone(
          {
            setHeaders: {
                Authorization: `Bearer ${currentUser.token}`
            }
          }
        )
      }
    });

    return next.handle(request).pipe(
      catchError(error => {
        if(error) {
          localStorage.removeItem('user')
        }
        return throwError(error);
      })
    );
  }
}