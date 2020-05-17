import { SharedPageModule } from 'src/app/shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// import { TooltipsModule } from 'ionic-tooltips';

import { IonicModule } from '@ionic/angular';

import { EventsPageRoutingModule } from './events-routing.module';

import { EventsPage } from './events.page';
import { NgxPaginationModule } from 'ngx-pagination';

@NgModule({
  imports: [
    // TooltipsModule.forRoot(),
    CommonModule,
    ReactiveFormsModule,
    IonicModule,
    EventsPageRoutingModule,
    SharedPageModule,
    NgxPaginationModule
  ],
  declarations: [EventsPage]
})
export class EventsPageModule {}
