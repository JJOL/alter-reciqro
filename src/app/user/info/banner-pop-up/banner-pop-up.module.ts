import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BannerPopUpPageRoutingModule } from './banner-pop-up-routing.module';

import { BannerPopUpPage } from './banner-pop-up.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BannerPopUpPageRoutingModule
  ],
  declarations: []
})
export class BannerPopUpPageModule {}
