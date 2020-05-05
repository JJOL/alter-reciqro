import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ModalBannerPageRoutingModule } from './modal-banner-routing.module';

import { ModalBannerPage } from './modal-banner.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ModalBannerPageRoutingModule
  ],
  declarations: [ModalBannerPage]
})

/**
   * User Story Id: M2NC4
   * Allows the ModalBannerPageModule to be available for imports
   * @param  
   * @returns 
   */
export class ModalBannerPageModule {}
