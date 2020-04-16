import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CenterDetailPage } from './detail-center.page';

const routes: Routes = [
  {
    path: '',
    component: CenterDetailPage
  }


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CenterDetailPageRoutingModule {}
