import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MetricsPage } from './metrics.page';

const routes: Routes = [
  {
    path: '',
    component: MetricsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
// eslint-disable-next-line require-jsdoc
export class MetricsPageRoutingModule {}
