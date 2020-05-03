import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SysAnalyticsPageRoutingModule } from './sys-analytics-routing.module';

import { SysAnalyticsPage } from './sys-analytics.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SysAnalyticsPageRoutingModule
  ],
  declarations: [SysAnalyticsPage]
})
export class SysAnalyticsPageModule {}
