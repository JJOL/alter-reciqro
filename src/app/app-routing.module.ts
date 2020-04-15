import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  //dummy, at the end it should redirect to auth!
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
    path: 'place-type',
    loadChildren: () => import('./src/app/admin/center/place-type/place-type.module').then( m => m.PlaceTypePageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
