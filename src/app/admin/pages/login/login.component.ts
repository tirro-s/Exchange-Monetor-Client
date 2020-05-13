import { AuthService } from './../../servises/auth.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {
  form: FormGroup;
  sub: Subscription;
  error: string;

  constructor(private auth: AuthService, private router: Router) { }

  ngOnInit() {
    this.form = new FormGroup({
      login: new FormControl(null, Validators.required),
      password: new FormControl(null, Validators.required)
    });
  }

  onSubmit() {
    if (this.form.invalid) {
      return;
    }
    this.form.disable();

    const user = {
      login: this.form.value.login,
      password: this.form.value.password,
    };

    this.sub = this.auth.login(this.form.value).subscribe(
      result => {
       this.router.navigate(['admin', 'valutas']);
       this.form.enable();
      },
      error => {
        this.error = error;
        this.form.enable();
      }
    );

  }

  ngOnDestroy() {
    if (this.sub) {
      this.sub.unsubscribe();
    }
  }

}
