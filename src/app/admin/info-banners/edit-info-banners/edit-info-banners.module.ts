import { SharedPageModule } from 'src/app/shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditInfoBannersPageRoutingModule } from './edit-info-banners-routing.module';

import { EditInfoBannersPage } from './edit-info-banners.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EditInfoBannersPageRoutingModule,
    SharedPageModule,
    ReactiveFormsModule
  ],
  declarations: [EditInfoBannersPage]
})
export class EditInfoBannersPageModule {}
