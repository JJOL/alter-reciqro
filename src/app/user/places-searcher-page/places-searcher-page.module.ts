import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PlacesSearcherPagePageRoutingModule } from './places-searcher-page-routing.module';

import { PlacesSearcherPagePage } from './places-searcher-page.page';

import { SharedPageModule } from '../../shared/shared.module';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PlacesSearcherPagePageRoutingModule,
    SharedPageModule
  ],
  declarations: [PlacesSearcherPagePage]
})
export class PlacesSearcherPagePageModule {}
