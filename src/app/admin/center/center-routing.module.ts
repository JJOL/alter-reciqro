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
    path: 'list-center',
    loadChildren: () => import('./list-center/list-center.module').then( m => m.ListCenterPageModule)
  },
  {
    path: 'place-type',
    loadChildren: () => import('./place-type/place-type.module').then( m => m.PlaceTypePageModule)
  },
  {
    path: 'waste-type',
    loadChildren: () => import('./waste-type/waste-type.module').then( m => m.WasteTypePageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})

/**
 * Exporting the class so it is externally accessible.
 */
export class CenterPageRoutingModule {}
