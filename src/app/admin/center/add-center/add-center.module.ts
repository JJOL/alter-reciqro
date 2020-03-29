import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddCenterPageRoutingModule } from './add-center-routing.module';

import { AddCenterPage } from './add-center.page';
import { SharedPageModule } from 'src/app/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    IonicModule,
    AddCenterPageRoutingModule,
    SharedPageModule
  ],
  declarations: [AddCenterPage]
})
export class AddCenterPageModule {}
