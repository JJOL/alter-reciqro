import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SysAnalyticsPageRoutingModule } from './sys-analytics-routing.module';

import { SysAnalyticsPage } from './sys-analytics.page';
import { SharedPageModule } from 'src/app/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SysAnalyticsPageRoutingModule,
    SharedPageModule
  ],
  declarations: [SysAnalyticsPage]
})
export class SysAnalyticsPageModule {}
