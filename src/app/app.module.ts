import { KursesComponent } from './main/pages/monitoring/kurses/kurses.component';
import { MenuComponent } from './main/pages/monitoring/menu/menu.component';
import { MonitoringComponent } from './main/pages/monitoring/monitoring.component';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainLayoutComponent } from './main/main-layout/main-layout.component';
import { TokenInterceptor } from './admin/token-interceptor';


@NgModule({
  declarations: [
    AppComponent,
    MainLayoutComponent,
    MonitoringComponent,
    MenuComponent,
    KursesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      multi: true,
      useClass: TokenInterceptor
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
