import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { UpdateWasteTypePageRoutingModule } from './update-waste-type-routing.module';
import { UpdateWasteTypePage } from './update-waste-type.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UpdateWasteTypePageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [UpdateWasteTypePage]
})

/**
   * User Story Id: M2NG12
   * Allows the UpdateWasteTypePageModule available for imports
   * @param  
   * @returns 
   */
export class UpdateWasteTypePageModule {}
