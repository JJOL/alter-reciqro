import { SharedPageModule } from 'src/app/shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { EventsPageRoutingModule } from './events-routing.module';
import { EventsPage } from './events.page';
import { NgxPaginationModule } from 'ngx-pagination';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    IonicModule,
    EventsPageRoutingModule,
    SharedPageModule,
    NgxPaginationModule
  ],
  declarations: [EventsPage]
})
/**
 * Exporting class so it is externally accessible.
 */
export class EventsPageModule {}
