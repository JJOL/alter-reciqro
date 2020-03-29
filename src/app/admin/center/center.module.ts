import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CenterPageRoutingModule } from './center-routing.module';

import { CenterPage } from './center.page';
import { RouterModule } from '@angular/router';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    RouterModule,
    CenterPageRoutingModule,
  ],
  exports: [],
  declarations: [CenterPage]
})
export class CenterPageModule {}
