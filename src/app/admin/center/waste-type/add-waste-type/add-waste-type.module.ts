import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddWasteTypePageRoutingModule } from './add-waste-type-routing.module';

import { AddWasteTypePage } from './add-waste-type.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddWasteTypePageRoutingModule
  ],
  declarations: [AddWasteTypePage]
})
export class AddWasteTypePageModule {}
