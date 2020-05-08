import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'
import { IonicModule } from '@ionic/angular';
import { BannerPageRoutingModule } from './banner-routing.module';
import { BannerPage } from './banner.page';
import { SharedPageModule } from '../../../shared/shared.module';
import { ModalBannerPage } from './modal-banner/modal-banner.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BannerPageRoutingModule,
    SharedPageModule
  ],
  declarations: [BannerPage, ModalBannerPage],
  entryComponents: [ModalBannerPage]
})

/**
   * User Story Id: M2NC5
   * Allows the BannerPageModule to be available for imports
   * @param  
   * @returns 
   */
export class BannerPageModule {}
