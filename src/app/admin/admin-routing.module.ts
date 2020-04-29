import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AuthGuard} from '../core/guards/auth.guard';
import { AdminPage } from './admin.page';

const routes: Routes = [
  {
    path: '',
    component: AdminPage,
  },
  {
    path: 'center',
    loadChildren: () => import('./center/center.module').then( m => m.CenterPageModule),
    canActivate: [AuthGuard],
    data: { roles: ['admin','staff']}
  },
  {
    path: 'goals',
    loadChildren: () => import('./goals/goals.module').then( m => m.GoalsPageModule),
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
    path: 'add-admin',
    loadChildren: () => import('./add-admin/add-admin.module').then( m => m.AddAdminPageModule)
  },
  {
    path: 'info-banners',
    loadChildren: () => import('./info-banners/info-banners.module').then( m => m.InfoBannersPageModule)
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
