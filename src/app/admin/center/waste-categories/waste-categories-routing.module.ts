import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { WasteCategoriesPage } from './waste-categories.page';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        component: WasteCategoriesPage
      },
      {
        path: ':wasteId',
        loadChildren: () => import('./waste-detail/waste-detail.module').then( m => m.WasteDetailPageModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class WasteCategoriesPageRoutingModule {}
