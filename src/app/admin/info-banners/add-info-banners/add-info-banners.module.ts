import { AddInfoBannersPage } from './../add-info-banners/add-info-banners.page';
import { AddInfoBannersPageRoutingModule } from './../add-info-banners/add-info-banners-routing.module';
import { SharedPageModule } from './../../../shared/shared.module';

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';


@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    IonicModule,
    AddInfoBannersPageRoutingModule,
    SharedPageModule
  ],
  declarations: [AddInfoBannersPage]
})
export class AddInfoBannersPageModule {}
