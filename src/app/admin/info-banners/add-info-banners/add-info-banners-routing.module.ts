import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddInfoBannersPage } from './add-info-banners.page';

const routes: Routes = [
  {
    path: '',
    component: AddInfoBannersPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddInfoBannersPageRoutingModule {}
