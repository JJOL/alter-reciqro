import { NgModule} from '@angular/core';
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

/**
   * User Story Id: M1NG9
   * Allows the Add Place Type Module to be available for imports
   * @param  
   * @returns 
   */
export class AddPlaceTypePageModule {}
