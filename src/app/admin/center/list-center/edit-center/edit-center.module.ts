import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {  ReactiveFormsModule} from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditCenterPageRoutingModule } from './edit-center-routing.module';

import { EditCenterPage } from './edit-center.page';
import {SharedPageModule} from '../../../../shared/shared.module';


@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    IonicModule,
    EditCenterPageRoutingModule,
    SharedPageModule,
  ],
  declarations: [EditCenterPage]
})
/**
 * Exporting the class so it is externally accessible.
 */
export class EditCenterPageModule {}
