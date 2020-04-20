import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PlaceTypePage } from './place-type.page';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        component: PlaceTypePage
      },
      {
        path: ':wasteId',
        loadChildren: () => import('./detail-place-type/detail-place-type.module').then( m => m.DetailPlaceTypePageModule)
      },
      {
        path: 'update/:updatePlaceTypeId',
        loadChildren: () => import('./update-place-type/update-place-type.module').then( m => m.UpdatePlaceTypePageModule)
      }
    ]
  },
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PlaceTypePageRoutingModule {}
