import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DetailPlaceTypePageRoutingModule } from './detail-place-type-routing.module';

import { DetailPlaceTypePage } from './detail-place-type.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DetailPlaceTypePageRoutingModule
  ],
  declarations: [DetailPlaceTypePage]
})
export class DetailPlaceTypePageModule {}
