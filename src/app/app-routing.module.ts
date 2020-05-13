import { MonitoringComponent } from './main/pages/monitoring/monitoring.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';

import { MainLayoutComponent } from './main/main-layout/main-layout.component';

const routes: Routes = [
  { path: '', component: MainLayoutComponent, children: [
    {path: '', redirectTo: '/', pathMatch: 'full'},
    {path: '', component: MonitoringComponent}
  ]},
  { path: 'admin', loadChildren: './admin/admin.module#AdminModule' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    preloadingStrategy: PreloadAllModules
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
