import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { WasteDetailPage } from './waste-detail.page';

const routes: Routes = [
  {
    path: '',
    component: WasteDetailPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class WasteDetailPageRoutingModule {}
