import { MenuComponent } from './menu/menu.component';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SharedPageRoutingModule } from './shared-routing.module';

import { SharedPage } from './shared.page';

import { GoogleMapComponent } from './google-map/google-map.component';
import { FilterButtonComponent } from './ui/filter-button/filter-button.component';
import { FilterMenuComponent } from './ui/filter-menu/filter-menu.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharedPageRoutingModule
  ],
  exports: [GoogleMapComponent, FilterMenuComponent,ToolbarComponent],
  declarations: [SharedPage, GoogleMapComponent, FilterButtonComponent, FilterMenuComponent,  ToolbarComponent]
})
export class SharedPageModule {}
