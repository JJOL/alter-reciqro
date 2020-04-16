import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule , ReactiveFormsModule} from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditCenterPageRoutingModule } from './edit-center-routing.module';

import { EditCenterPage } from './edit-center.page';
import {SharedPageModule} from '../../../../shared/shared.module';
import { RouterModule } from '@angular/router';


@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    // FormsModule,
    IonicModule,
    EditCenterPageRoutingModule,
    SharedPageModule,
  ],
  declarations: [EditCenterPage]
})
export class EditCenterPageModule {}
