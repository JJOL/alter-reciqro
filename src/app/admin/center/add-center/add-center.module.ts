import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddCenterPageRoutingModule } from './add-center-routing.module';

import { AddCenterPage } from './add-center.page';
import { RouterModule } from '@angular/router';
import {SharedPageModule} from '../../../shared/shared.module';
@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    IonicModule,
    AddCenterPageRoutingModule,
    SharedPageModule
  ],
  declarations: [AddCenterPage]
})
export class AddCenterPageModule {}
