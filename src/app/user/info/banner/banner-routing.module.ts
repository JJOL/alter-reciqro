import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BannerPage } from './banner.page';

const routes: Routes = [
  {
    path: '',
    component: BannerPage
  },
  {
    path: 'modal-banner',
    loadChildren: () => import('./modal-banner/modal-banner.module').then( m => m.ModalBannerPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BannerPageRoutingModule {}
