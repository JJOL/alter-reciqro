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

/**
   * User Story Id: M1NG7
   * Allows the Detail Place Type Module to be available for imports
   * @param  
   * @returns 
   */
export class DetailPlaceTypePageModule {}
