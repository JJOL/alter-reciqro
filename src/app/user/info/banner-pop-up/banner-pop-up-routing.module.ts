import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BannerPopUpPage } from './banner-pop-up.page';

const routes: Routes = [
  {
    path: '',
    component: BannerPopUpPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BannerPopUpPageRoutingModule {}
