import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ListCenterPageRoutingModule } from './list-center-routing.module';

import { ListCenterPage } from './list-center.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ListCenterPageRoutingModule
  ],
  declarations: [ListCenterPage]
})
/**
 * Exporting ListCenterPageModule class so it is externally accessible.
 */
export class ListCenterPageModule {}
