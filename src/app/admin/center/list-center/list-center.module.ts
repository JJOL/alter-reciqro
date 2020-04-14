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
export class ListCenterPageModule {}
