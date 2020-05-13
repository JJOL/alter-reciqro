import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ListCenterPageRoutingModule } from './list-center-routing.module';

import { ListCenterPage } from './list-center.page';
import { SharedPageModule } from 'src/app/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ListCenterPageRoutingModule,
    SharedPageModule
  ],
  declarations: [ListCenterPage]
})
/**
 * Exporting ListCenterPageModule class so it is externally accessible.
 */
export class ListCenterPageModule {}
