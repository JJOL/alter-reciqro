import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { InfoPageRoutingModule } from './info-routing.module';
import { InfoPage } from './info.page';
import { BannerPopUpPage } from './banner-pop-up/banner-pop-up.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    InfoPageRoutingModule
  ],
  declarations: [InfoPage, BannerPopUpPage],
  entryComponents: [BannerPopUpPage]
})
/**
 * Exporting waste class so it is usable.
*/
export class InfoPageModule {}
