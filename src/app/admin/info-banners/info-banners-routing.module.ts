import { AuthGuard } from 'src/app/core/guards/auth.guard';
import { AddInfoBannersPageModule } from './add-info-banners/add-info-banners.module';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { InfoBannersPage } from './info-banners.page';

const routes: Routes = [
  {
    path: '',
    component: InfoBannersPage
  },
  {
    path: 'add',
    loadChildren: () => import('./add-info-banners/add-info-banners.module').then( m => m.AddInfoBannersPageModule),
    canActivate: [AuthGuard],
    data: { roles: ['admin','staff']}
  },
  {
    path: 'edit/:updateInfoBannerId',
    loadChildren: () => import('./edit-info-banners/edit-info-banners.module').then( m => m.EditInfoBannersPageModule),
    canActivate: [AuthGuard],
    data: { roles: ['admin','staff']}
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InfoBannersPageRoutingModule {}
