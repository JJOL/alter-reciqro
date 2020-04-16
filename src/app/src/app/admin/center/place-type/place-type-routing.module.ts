import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PlaceTypePage } from './place-type.page';

const routes: Routes = [
  {
    path: '',
    component: PlaceTypePage
  },
  {
    path: 'edit-place-type',
    loadChildren: () => import('./edit-place-type/edit-place-type.module').then( m => m.EditPlaceTypePageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PlaceTypePageRoutingModule {}
