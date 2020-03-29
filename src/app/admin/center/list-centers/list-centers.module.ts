import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ListCentersPageRoutingModule } from './list-centers-routing.module';

import { ListCentersPage } from './list-centers.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ListCentersPageRoutingModule
  ],
  declarations: [ListCentersPage]
})
export class ListCentersPageModule {}
