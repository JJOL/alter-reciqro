import { NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { AddPlaceTypePageRoutingModule } from './add-place-type-routing.module';
import { AddPlaceTypePage } from './add-place-type.page';
import { SharedPageModule } from 'src/app/shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddPlaceTypePageRoutingModule,
    SharedPageModule,
    ReactiveFormsModule
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
