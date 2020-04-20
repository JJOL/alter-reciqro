import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  // dummy, at the end it should redirect to auth!
  { path: '', redirectTo: 'user/places-searcher-page', pathMatch: 'full' },
  {
    path: 'admin',
    loadChildren: () => import('./admin/admin.module').then( m => m.AdminPageModule)
  },
  {
    path: 'user',
    loadChildren: () => import('./user/user.module').then( m => m.UserPageModule)
  },
  {
    path: 'shared',
    loadChildren: () => import('./shared/shared.module').then( m => m.SharedPageModule)
  },
  {
    path: 'recover-password',
    loadChildren: () => import('./core/recover-password/recover-password.module').then( m => m.RecoverPasswordPageModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
