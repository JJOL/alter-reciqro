import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UserPage } from './user.page';

const routes: Routes = [
  {
    path: '',
    component: UserPage
  },
  {
    path: 'places-searcher-page',
    loadChildren: () => import('./places-searcher-page/places-searcher-page.module').then( m => m.PlacesSearcherPagePageModule)
  },
  {
    path: 'info',
    loadChildren: () => import('./info/info.module').then( m => m.InfoPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'register',
    loadChildren: () => import('./register/register.module').then( m => m.RegisterPageModule)
  },
  
  {
    path: 'recover-password',
    loadChildren: () => import('./recover-password/recover-password.module').then( m => m.RecoverPasswordPageModule)
  },
  {
    path: 'visits',
    loadChildren: () => import('./visits/visits.module').then( m => m.VisitsPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserPageRoutingModule {}
