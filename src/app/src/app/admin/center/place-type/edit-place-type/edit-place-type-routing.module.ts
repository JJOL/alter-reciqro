import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EditPlaceTypePage } from './edit-place-type.page';

const routes: Routes = [
  {
    path: '',
    component: EditPlaceTypePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EditPlaceTypePageRoutingModule {}
