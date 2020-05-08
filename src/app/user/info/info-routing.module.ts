import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { InfoPage } from './info.page';
import { AuthGuard } from 'src/app/core/guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    component: InfoPage,
    
  },
  {
    path: 'waste',
    loadChildren: () => import('./waste/waste.module').then( m => m.WastePageModule),
    
  },
  {
    path: 'events',
    loadChildren: () => import('./events/events.module').then( m => m.EventsPageModule),
    
  },
  {
    path: 'funfacts',
    loadChildren: () => import('./banner/banner.module').then( m => m.BannerPageModule),
    
  },
  {
    path: 'banner-pop-up',
    loadChildren: () => import('./banner-pop-up/banner-pop-up.module').then( m => m.BannerPopUpPageModule)
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
/**
 * Exporting routing class so it is usable.
*/
export class InfoPageRoutingModule {}
