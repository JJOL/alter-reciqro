import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { WasteCategoriesPageRoutingModule } from './waste-categories-routing.module';

import { WasteCategoriesPage } from './waste-categories.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    WasteCategoriesPageRoutingModule
  ],
  declarations: [WasteCategoriesPage]
})
export class WasteCategoriesPageModule {}
