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
export class UpdateWasteTypePageRoutingModule {}
