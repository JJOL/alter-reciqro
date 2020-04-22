import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddCenterPage } from './add-center.page';

const routes: Routes = [
  {
    path: '',
    component: AddCenterPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})

// eslint-disable-next-line require-jsdoc
export class AddCenterPageRoutingModule {}
