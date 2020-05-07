import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { AddWasteTypePageRoutingModule } from './add-waste-type-routing.module';
import { AddWasteTypePage } from './add-waste-type.page';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedPageModule } from '../../../../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddWasteTypePageRoutingModule,
    ReactiveFormsModule,
    SharedPageModule
  ],
  declarations: [AddWasteTypePage]
})

/**
   * User Story Id: M2NG14
   * Allows the AddWasteTypePageModule available for imports
   * @param  
   * @returns 
   */
export class AddWasteTypePageModule {}
