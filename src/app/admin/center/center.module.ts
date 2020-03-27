import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CenterPageRoutingModule } from './center-routing.module';

import { CenterPage } from './center.page';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule,
    CenterPageRoutingModule
  ],
  declarations: [CenterPage]
})
export class CenterPageModule {}
