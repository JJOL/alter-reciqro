import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UpdateWasteTypePage } from './update-waste-type.page';

const routes: Routes = [
  {
    path: '',
    component: UpdateWasteTypePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})

/**
   * User Story Id: M2NG12
   * Allows the UpdateWasteTypePageRoutingModule available for imports
   * @param  
   * @returns 
   */
export class UpdateWasteTypePageRoutingModule {}
