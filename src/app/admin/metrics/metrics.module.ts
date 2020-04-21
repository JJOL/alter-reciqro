import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MetricsPageRoutingModule } from './metrics-routing.module';

import { MetricsPage } from './metrics.page';
import { IndicatorGraphComponent } from './indicator-graph/indicator-graph.component';
import { PlacesMetricsComponent } from './places-metrics/places-metrics.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MetricsPageRoutingModule
  ],
  declarations: [MetricsPage, PlacesMetricsComponent, IndicatorGraphComponent]
})
export class MetricsPageModule {}
