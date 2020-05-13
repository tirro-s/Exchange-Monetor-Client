import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './pages/login/login.component';
import { ExchangersComponent } from './pages/exchangers/exchangers.component';
import { ValutasComponent } from './pages/valutas/valutas.component';
import { ValService } from './servises/val-service';
import { ExService } from './servises/ex-service';
import { CommonModule } from '@angular/common';
import { AdminLayoutComponent } from './admin-layout/admin-layout.component';
import { AuthGuard } from './guards/auth.guard';
import { SettingsComponent } from './pages/settings/settings.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild([
      {path: '', component: AdminLayoutComponent, children: [
        { path: '', redirectTo: '/admin/login', pathMatch: 'full' },
        { path: 'login', component: LoginComponent },
        { path: 'valutas', canActivate: [AuthGuard], component: ValutasComponent },
        { path: 'exchangers', canActivate: [AuthGuard], component: ExchangersComponent },
        { path: 'settings', canActivate: [AuthGuard], component: SettingsComponent }
      ]},
  ])
],
  exports: [RouterModule],
  providers: [
    ValService,
    ExService
  ],
  declarations: [LoginComponent, ExchangersComponent, ValutasComponent, AdminLayoutComponent, SettingsComponent]
})

export class AdminModule {

}
