import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddPage } from './add.page';

const routes: Routes = [
  {
    path: '',
    component: AddPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
/**
 * Exporting the class so it is externally accessible.
 */
export class AddPageRoutingModule {}
