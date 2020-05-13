import { AuthService } from './servises/auth.service';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { exhaustMap, take } from 'rxjs/operators';

@Injectable({ providedIn: 'root'})
export class TokenInterceptor implements HttpInterceptor {

  constructor(private auth: AuthService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return this.auth.user.pipe(
      take(1),
      exhaustMap(user => {
        if (!user) {
          return next.handle(req);
        }
        const modifiedReq = req.clone({
          setHeaders: {
            Authorization: user.token,
          }
        });
        return next.handle(modifiedReq);
      })
    );
  }
}
