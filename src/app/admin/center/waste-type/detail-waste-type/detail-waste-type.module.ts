import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DetailWasteTypePageRoutingModule } from './detail-waste-type-routing.module';

import { DetailWasteTypePage } from './detail-waste-type.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DetailWasteTypePageRoutingModule
  ],
  declarations: [DetailWasteTypePage]
})
export class DetailWasteTypePageModule {}
