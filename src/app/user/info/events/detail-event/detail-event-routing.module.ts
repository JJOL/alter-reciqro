import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DetailEventPage } from './detail-event.page';

const routes: Routes = [
  {
    path: '',
    component: DetailEventPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
/**
 * Export class so it is externally accessible.
 */
export class DetailEventPageRoutingModule {}
