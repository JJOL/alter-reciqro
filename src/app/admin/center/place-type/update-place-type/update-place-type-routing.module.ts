import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UpdatePlaceTypePage } from './update-place-type.page';

const routes: Routes = [
  {
    path: '',
    component: UpdatePlaceTypePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})

/**
   * User Story Id: M1NG11
   * Allows the Update Place Type Routing Module to be available for imports
   * @param  
   * @returns 
   */
export class UpdatePlaceTypePageRoutingModule {}
