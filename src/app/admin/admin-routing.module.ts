import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdminPage } from './admin.page';

const routes: Routes = [
  {
    path: '',
    component: AdminPage,
  },
  {
    path: 'center',
    loadChildren: () => import('./center/center.module').then( m => m.CenterPageModule)
  },
  {
    path: 'info',
    loadChildren: () => import('./info/info.module').then( m => m.InfoPageModule)
  },
  {
    path: 'goals',
    loadChildren: () => import('./goals/goals.module').then( m => m.GoalsPageModule)
  },
  {
    path: 'metrics',
    loadChildren: () => import('./metrics/metrics.module').then( m => m.MetricsPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminPageRoutingModule {}