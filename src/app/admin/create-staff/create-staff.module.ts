import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CreateStaffPageRoutingModule } from './create-staff-routing.module';

import { CreateStaffPage } from './create-staff.page';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    IonicModule,
    CreateStaffPageRoutingModule
  ],
  declarations: [CreateStaffPage]
})
export class CreateStaffPageModule {}
