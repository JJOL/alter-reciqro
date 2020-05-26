import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule, IonRouterOutlet } from '@ionic/angular';
import { InfoPageRoutingModule } from './info-routing.module';
import { InfoPage } from './info.page';
import { SharedPageModule } from 'src/app/shared/shared.module';
import { BannerPopUpPage } from './banner-pop-up/banner-pop-up.page';
import { BannerPopUpPageModule } from './banner-pop-up/banner-pop-up.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    InfoPageRoutingModule,
    SharedPageModule,
    BannerPopUpPageModule
  ],
  declarations: [InfoPage],
  entryComponents: [BannerPopUpPage]
})
/**
 * Exporting waste class so it is usable.
*/
export class InfoPageModule {}
