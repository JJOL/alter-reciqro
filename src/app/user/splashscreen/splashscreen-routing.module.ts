import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SplashscreenPage } from './splashscreen.page';

const routes: Routes = [
  {
    path: '',
    component: SplashscreenPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
/**
 * Export class so it is externally accessible.
 */
export class SplashscreenPageRoutingModule {}
