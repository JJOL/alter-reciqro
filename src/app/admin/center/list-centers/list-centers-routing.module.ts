import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListCentersPage } from './list-centers.page';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        component: ListCentersPage
      },
      {
        path: ':centerId',
        loadChildren: () => import('./center-detail/center-detail.module').then( m => m.CenterDetailPageModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ListCentersPageRoutingModule {}
