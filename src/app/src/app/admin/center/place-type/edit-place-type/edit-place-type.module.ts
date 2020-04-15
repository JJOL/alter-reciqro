import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditPlaceTypePageRoutingModule } from './edit-place-type-routing.module';

import { EditPlaceTypePage } from './edit-place-type.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EditPlaceTypePageRoutingModule
  ],
  declarations: [EditPlaceTypePage]
})
export class EditPlaceTypePageModule {}
