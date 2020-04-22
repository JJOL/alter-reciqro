import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListCenterPage } from './list-center.page';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        component: ListCenterPage
      },
      {
        path: ':centerId',
        loadChildren: () => import('./detail-center/detail-center.module').then( m => m.CenterDetailPageModule)
      }
      ,
      {
        path: 'edit-center/:centerId',
        loadChildren: () => import('./edit-center/edit-center.module').then( m => m.EditCenterPageModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
/**
 * Exporting ListCenterPageRoutingModule class so it is externally accessible.
 */
export class ListCenterPageRoutingModule {}
