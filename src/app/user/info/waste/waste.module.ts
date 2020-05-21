import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { WastePageRoutingModule } from './waste-routing.module';
import { WastePage } from './waste.page';
import { SharedPageModule } from 'src/app/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    WastePageRoutingModule,
    SharedPageModule
  ],
  declarations: [WastePage]
})
/**
 * Exporting waste class so it is usable.
*/
export class WastePageModule {}
