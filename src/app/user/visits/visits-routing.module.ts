import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VisitsPage } from './visits.page';

const routes: Routes = [
  {
    path: '',
    component: VisitsPage
  },
  {
    path: 'add-visit',
    loadChildren: () => import('./add-visit/add-visit.module').then( m => m.AddVisitPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
/** */
export class VisitsPageRoutingModule {}
