import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { WasteDetailPageRoutingModule } from './waste-detail-routing.module';

import { WasteDetailPage } from './waste-detail.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    WasteDetailPageRoutingModule
  ],
  declarations: [WasteDetailPage]
})
export class WasteDetailPageModule {}
