import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../core/guards/auth.guard';
import { AdminPage } from './admin.page';

const routes: Routes = [
  {
    path: '',
    component: AdminPage,
    canActivate: [AuthGuard],
    data: { roles: ['admin']}
  },
  {
    path: 'center',
    loadChildren: () => import('./center/center.module').then( m => m.CenterPageModule),
    canActivate: [AuthGuard],
    data: { roles: ['admin','staff']}
  },
  {
    path: 'metrics',
    loadChildren: () => import('./metrics/metrics.module').then( m => m.MetricsPageModule),
    canActivate: [AuthGuard],
    data: { roles: ['admin','staff']}
  },
  {
    path: 'events',
    loadChildren: () => import('./events/events.module').then( m => m.EventsPageModule),
    canActivate: [AuthGuard],
    data: { roles: ['admin','staff']}
  },
  {
    path: 'create-staff',
    loadChildren: () => import('./create-staff/create-staff.module').then( m => m.CreateStaffPageModule),
    canActivate: [AuthGuard],
    data: { roles: ['admin']}
  },
  {
    path: 'info-banners',
    loadChildren: () => import('./info-banners/info-banners.module').then( m => m.InfoBannersPageModule),
    canActivate: [AuthGuard],
    data: { roles: ['admin','staff']}
  },
  {
    path: 'sys-analytics',
    loadChildren: () => import('./sys-analytics/sys-analytics.module').then( m => m.SysAnalyticsPageModule)
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
/**
 * Exporting routing class so it is externally accessible.
 */
export class AdminPageRoutingModule {}
