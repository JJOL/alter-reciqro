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
export class UpdatePlaceTypePageRoutingModule {}
