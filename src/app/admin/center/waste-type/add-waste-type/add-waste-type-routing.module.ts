import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddWasteTypePage } from './add-waste-type.page';

const routes: Routes = [
  {
    path: '',
    component: AddWasteTypePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})

/**
   * User Story Id: M2NG14
   * Allows the AddWasteTypePageRoutingModule available for imports
   * @param  
   * @returns 
   */
export class AddWasteTypePageRoutingModule {}
