import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddPlaceTypePage } from './add-place-type.page';

const routes: Routes = [
  {
    path: '',
    component: AddPlaceTypePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})

/**
   * User Story Id: M1NG9
   * Allows the Add Place Type Routing Module to be available for imports
   * @param  
   * @returns 
   */
export class AddPlaceTypePageRoutingModule {}
