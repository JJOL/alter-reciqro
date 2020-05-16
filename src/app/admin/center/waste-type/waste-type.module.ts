import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { WasteTypePageRoutingModule } from './waste-type-routing.module';
import { SharedPageModule } from '../../../shared/shared.module';
import { WasteTypePage } from './waste-type.page';
import { NgxPaginationModule } from 'ngx-pagination';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    WasteTypePageRoutingModule,
    SharedPageModule,
    NgxPaginationModule
  ],
  declarations: [WasteTypePage]
})

/**
   * User Story Id: M2NG11, M2NG13
   * Allows the WasteTypePageModule available for imports
   * @param  
   * @returns 
   */
export class WasteTypePageModule {}
