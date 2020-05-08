import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DetailEventPageRoutingModule } from './detail-event-routing.module';

import { DetailEventPage } from './detail-event.page';
import { SharedPageModule } from 'src/app/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DetailEventPageRoutingModule,
    SharedPageModule
  ],
  declarations: [DetailEventPage]
})
export class DetailEventPageModule {}
