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
export class DetailPlaceTypePageRoutingModule {}
