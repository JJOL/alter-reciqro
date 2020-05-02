import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { UpdatePlaceTypePageRoutingModule } from './update-place-type-routing.module';
import { UpdatePlaceTypePage } from './update-place-type.page';
import { SharedPageModule } from '../../../../shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UpdatePlaceTypePageRoutingModule,
    SharedPageModule,
    ReactiveFormsModule
  ],
  declarations: [UpdatePlaceTypePage]
})

/**
   * User Story Id: M1NG11
   * Allows the Update Place Type Module to be available for imports
   * @param  
   * @returns 
   */
export class UpdatePlaceTypePageModule {}
