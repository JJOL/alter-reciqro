import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { WasteTypePage } from './waste-type.page';

const routes: Routes = [
  {
    path: '',
    component: WasteTypePage
  },
  {
    path: 'update/:wasteId',
    loadChildren: () => import('./update-waste-type/update-waste-type.module').then( m => m.UpdateWasteTypePageModule)
  },
  {
    path: 'addWasteType',
    loadChildren: () => import('./add-waste-type/add-waste-type.module').then( m => m.AddWasteTypePageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})

/**
   * User Story Id: M2NG11, M2NG13
   * Allows the WasteTypePageRoutingModule available for imports
   * @param  
   * @returns 
   */
export class WasteTypePageRoutingModule {}
