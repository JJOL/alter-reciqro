import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EventsPageRoutingModule } from './events-routing.module';
import {SharedPageModule} from 'src/app/shared/shared.module';
import { EventsPage } from './events.page';
import { NgxPaginationModule } from 'ngx-pagination';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EventsPageRoutingModule,
    SharedPageModule,
    NgxPaginationModule
  ],
  declarations: [EventsPage]
})
export class EventsPageModule {}
