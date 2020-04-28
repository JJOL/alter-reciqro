import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { InfoPage } from './info.page';
import { AuthGuard } from 'src/app/core/guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    component: InfoPage,
    canActivate: [AuthGuard],
    data: { roles: ['user']}
  },
  {
    path: 'waste',
    loadChildren: () => import('./waste/waste.module').then( m => m.WastePageModule),
    canActivate: [AuthGuard],
    data: { roles: ['user']}
  },
  {
    path: 'events',
    loadChildren: () => import('./events/events.module').then( m => m.EventsPageModule),
    canActivate: [AuthGuard],
    data: { roles: ['user']}
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
