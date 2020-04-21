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
export class AddPlaceTypePageRoutingModule {}
