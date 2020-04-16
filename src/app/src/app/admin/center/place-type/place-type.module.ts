import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PlaceTypePageRoutingModule } from './place-type-routing.module';

import { PlaceTypePage } from './place-type.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PlaceTypePageRoutingModule
  ],
  declarations: [PlaceTypePage]
})
export class PlaceTypePageModule {}
