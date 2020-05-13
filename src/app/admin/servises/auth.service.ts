import { Observable, BehaviorSubject, throwError } from 'rxjs';
import { Candidate } from '../interfaces/candidate.interface';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap, catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { User } from '../models/user.model';

export interface AuthResponceData {
  token: string;
  expiresIn: number;
}

@Injectable({ providedIn: 'root'})
export class AuthService {

  user = new BehaviorSubject<User>(null);
  private tokenExpirationTimer: any;


  constructor(private http: HttpClient, private router: Router) { }

  login(candidate: Candidate): Observable<AuthResponceData> {
    return this.http.post<AuthResponceData>('http://localhost:3000/auth/login', candidate).pipe(
        tap( resData => {
          const expirationDate = new Date(new Date().getTime() + resData.expiresIn * 1000);
          const user = new User(resData.token, expirationDate);
          this.user.next(user);
          this.autoLogout(resData.expiresIn * 1000);
          localStorage.setItem('userData', JSON.stringify(user));
        }),
        catchError( errorRes => {
          if (!errorRes.error) {
            return throwError('Unknown error ocurred');
          }
          return throwError(errorRes.error.message);
        })
    );
  }

  autoLogin() {
    const userData: {
      _token: string;
      _expirationDate: string;
    } = JSON.parse(localStorage.getItem('userData'));
    if (!userData) {
      return;
    }

    const loadedUser = new User(
      userData._token,
      new Date(userData._expirationDate)
    );

    if (loadedUser.token) {
      this.user.next(loadedUser);
      const expirationDuration = new Date(userData._expirationDate).getTime() - new Date().getTime();
      this.router.navigate(['admin', 'valutas']);
      this.autoLogout(expirationDuration);
    }
  }


  logout() {
    this.user.next(null);
    this.router.navigate(['admin', 'login']);
    localStorage.removeItem('userData');
    if (this.tokenExpirationTimer) {
      clearTimeout(this.tokenExpirationTimer);
    }
    this.tokenExpirationTimer = null;
  }

  autoLogout(expirationDuration: number) {
    this.tokenExpirationTimer = setTimeout( () => {
      this.logout();
    }, expirationDuration);
  }

}
