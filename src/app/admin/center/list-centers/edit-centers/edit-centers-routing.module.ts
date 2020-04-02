import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EditCentersPage } from './edit-centers.page';

const routes: Routes = [
  {
    path: '',
    component: EditCentersPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EditCentersPageRoutingModule {}
