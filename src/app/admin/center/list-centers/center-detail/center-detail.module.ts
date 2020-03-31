import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CenterDetailPageRoutingModule } from './center-detail-routing.module';

import { CenterDetailPage } from './center-detail.page';

import {SharedPageModule} from '../../../../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CenterDetailPageRoutingModule,
    SharedPageModule
  ],
  declarations: [CenterDetailPage]
})
export class CenterDetailPageModule {}
