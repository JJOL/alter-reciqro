import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedPageModule } from 'src/app/shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IonicModule } from '@ionic/angular';

import { DetailEventPageRoutingModule } from './detail-event-routing.module';

import { DetailEventPage } from './detail-event.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    DetailEventPageRoutingModule,
    SharedPageModule
  ],
  declarations: [DetailEventPage]
})
/**
 * Exporting class so it is externally accesible.
 */
export class DetailEventPageModule {}
