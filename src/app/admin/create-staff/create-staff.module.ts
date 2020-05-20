import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CreateStaffPageRoutingModule } from './create-staff-routing.module';

import { CreateStaffPage } from './create-staff.page';
import { SharedPageModule } from 'src/app/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    IonicModule,
    CreateStaffPageRoutingModule,
    SharedPageModule
  ],
  declarations: [CreateStaffPage]
})
export class CreateStaffPageModule {}
