import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PlacesSearcherPagePage } from './places-searcher-page.page';

const routes: Routes = [
  {
    path: '',
    component: PlacesSearcherPagePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PlacesSearcherPagePageRoutingModule {}
