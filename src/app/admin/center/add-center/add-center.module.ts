import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddCenterPageRoutingModule } from './add-center-routing.module';

import { AddCenterPage } from './add-center.page';
//Necesitamos refactor aquí porque si no de que sirve usar angular
import {SharedPageModule} from '../../../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    IonicModule, 
    AddCenterPageRoutingModule,
    SharedPageModule,
  ],
  declarations: [
    AddCenterPage,
  ]
})
export class AddCenterPageModule {}
