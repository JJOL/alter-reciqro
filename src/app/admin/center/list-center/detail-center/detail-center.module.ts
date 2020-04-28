import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CenterDetailPageRoutingModule } from './detail-center-routing.module';

import { CenterDetailPage } from './detail-center.page';

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
/**
 * Exporting CenterDetailPageModule class so it is externally accessible.
 */
export class CenterDetailPageModule {}
