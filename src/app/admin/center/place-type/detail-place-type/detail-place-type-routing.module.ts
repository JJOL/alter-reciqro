import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DetailPlaceTypePage } from './detail-place-type.page';

const routes: Routes = [
  {
    path: '',
    component: DetailPlaceTypePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})

/**
   * User Story Id: M1NG7
   * Allows the Detail Place Type Routing Module to be available for imports
   * @param  
   * @returns 
   */
export class DetailPlaceTypePageRoutingModule {}
