import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { PlaceTypePageRoutingModule } from './place-type-routing.module';
import { PlaceTypePage } from './place-type.page';
import { SharedPageModule } from '../../../shared/shared.module';
import { NgxPaginationModule } from 'ngx-pagination';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PlaceTypePageRoutingModule,
    SharedPageModule,
    NgxPaginationModule
  ],
  declarations: [PlaceTypePage],
})

/**
   * User Story Id: M1NG8, M1NG10
   * Allows the Place Type Module to be available for imports
   * @param  
   * @returns 
   */
export class PlaceTypePageModule {}
