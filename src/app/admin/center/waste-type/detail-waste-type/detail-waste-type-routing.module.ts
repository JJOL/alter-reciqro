import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DetailWasteTypePage } from './detail-waste-type.page';

const routes: Routes = [
  {
    path: '',
    component: DetailWasteTypePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DetailWasteTypePageRoutingModule {}
