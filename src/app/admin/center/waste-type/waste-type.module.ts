import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { WasteTypePageRoutingModule } from './waste-type-routing.module';

import { WasteTypePage } from './waste-type.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    WasteTypePageRoutingModule
  ],
  declarations: [WasteTypePage]
})
export class WasteTypePageModule {}
