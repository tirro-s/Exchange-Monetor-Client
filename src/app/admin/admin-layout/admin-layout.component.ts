import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../servises/auth.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-admin-layout',
  templateUrl: './admin-layout.component.html',
  styleUrls: ['./admin-layout.component.scss']
})
export class AdminLayoutComponent implements OnInit, OnDestroy {

  isAuthenticated = false;
  private sub: Subscription;

  constructor(private auth: AuthService, private router: Router) { }

  ngOnInit() {
    this.auth.autoLogin();

    this.sub = this.auth.user.subscribe( user => {
      this.isAuthenticated = !!user;
    });

  }

  onLogout() {
    this.auth.logout();
  }

  ngOnDestroy() {
    if (this.sub) {
      this.sub.unsubscribe();
    }
  }

}
