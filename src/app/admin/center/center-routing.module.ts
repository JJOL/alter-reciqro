import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CenterPage } from './center.page';

const routes: Routes = [
  {
    path: '',
    component: CenterPage
  },
  {
    path: 'add-center',
    loadChildren: () => import('./add-center/add-center.module').then( m => m.AddCenterPageModule)
  },
  {
    path: 'list-centers',
    loadChildren: () => import('./list-centers/list-centers.module').then( m => m.ListCentersPageModule)
  },
  {
    path: 'waste-categories',
    loadChildren: () => import('./waste-categories/waste-categories.module').then( m => m.WasteCategoriesPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CenterPageRoutingModule {}
