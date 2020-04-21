import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddPlaceTypePageRoutingModule } from './add-place-type-routing.module';

import { AddPlaceTypePage } from './add-place-type.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddPlaceTypePageRoutingModule
  ],
  declarations: [AddPlaceTypePage]
})
export class AddPlaceTypePageModule {}
