import { MarkerCardComponent } from './../marker-card/marker-card.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { PlacesSearcherPagePageRoutingModule } from './places-searcher-page-routing.module';
import { PlacesSearcherPagePage } from './places-searcher-page.page';
import { SharedPageModule } from '../../shared/shared.module';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { FilterMenuComponent } from '../../shared/ui/filter-menu/filter-menu.component';
import { SplashscreenPageModule } from '../splashscreen/splashscreen.module';
import { SplashscreenPage } from '../splashscreen/splashscreen.page';
import { HelpPageModule } from '../help/help.module';
import { HelpPage } from '../help/help.page';

@NgModule({
  imports: [
    // TooltipsModule.forRoot(),
    CommonModule,
    FormsModule,
    IonicModule,
    PlacesSearcherPagePageRoutingModule,
    SharedPageModule,
    SplashscreenPageModule,
    HelpPageModule,
  ],
  declarations: [PlacesSearcherPagePage, MarkerCardComponent],
  providers: [
    Geolocation
  ],
  entryComponents: [FilterMenuComponent, SplashscreenPage, HelpPage]
})
// eslint-disable-next-line require-jsdoc
export class PlacesSearcherPagePageModule {}
