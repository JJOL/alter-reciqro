import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EditInfoBannersPage } from './edit-info-banners.page';

const routes: Routes = [
  {
    path: '',
    component: EditInfoBannersPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EditInfoBannersPageRoutingModule {}
