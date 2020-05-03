import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SysAnalyticsPage } from './sys-analytics.page';

const routes: Routes = [
  {
    path: '',
    component: SysAnalyticsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SysAnalyticsPageRoutingModule {}
