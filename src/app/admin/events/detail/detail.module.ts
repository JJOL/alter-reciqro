import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { DetailPageRoutingModule } from './detail-routing.module';
import { DetailPage } from './detail.page';
import {SharedPageModule} from '../../../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    // FormsModule,
    ReactiveFormsModule,
    IonicModule,
    DetailPageRoutingModule,
    SharedPageModule
  ],
  declarations: [DetailPage]
})
/**
 * Exporting the class so it is externally accessible.
 */
export class DetailPageModule {}
