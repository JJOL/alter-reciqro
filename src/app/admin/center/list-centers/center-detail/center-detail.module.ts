import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CenterDetailPageRoutingModule } from './center-detail-routing.module';

import { CenterDetailPage } from './center-detail.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CenterDetailPageRoutingModule
  ],
  declarations: [CenterDetailPage]
})
export class CenterDetailPageModule {}
