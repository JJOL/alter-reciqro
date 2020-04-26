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
        path: 'detail/:wasteId',
        loadChildren: () => import('./detail-place-type/detail-place-type.module').then( m => m.DetailPlaceTypePageModule)
      },
      {
        path: 'update/:updatePlaceTypeId',
        loadChildren: () => import('./update-place-type/update-place-type.module').then( m => m.UpdatePlaceTypePageModule)
      },
      {
        path: 'add',
        loadChildren: () => import('./add-place-type/add-place-type.module').then( m => m.AddPlaceTypePageModule)
      }
    ]
  },
  
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})

/**
   * User Story Id: M1NG8, M1NG10
   * Allows the Place Type Routing Module to be available for imports
   * @param  
   * @returns 
   */
export class PlaceTypePageRoutingModule {}
