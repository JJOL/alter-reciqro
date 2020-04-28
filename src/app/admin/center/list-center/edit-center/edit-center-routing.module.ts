import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EditCenterPage } from './edit-center.page';

const routes: Routes = [
  {
    path: '',
    component: EditCenterPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
/*
*Exportar la clase edit
*/
export class EditCenterPageRoutingModule {}
