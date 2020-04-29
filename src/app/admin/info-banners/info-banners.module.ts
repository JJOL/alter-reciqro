import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { InfoBannersPageRoutingModule } from './info-banners-routing.module';

import { InfoBannersPage } from './info-banners.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    InfoBannersPageRoutingModule
  ],
  declarations: [InfoBannersPage]
})
export class InfoBannersPageModule {}
