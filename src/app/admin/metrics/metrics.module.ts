import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { MetricsPageRoutingModule } from './metrics-routing.module';
import { MetricsPage } from './metrics.page';
import { IndicatorGraphComponent } from './indicator-graph/indicator-graph.component';
import { IndicatorMetricsComponent } from './indicator-metrics/indicator-metrics.component';
import { IndicatorTableComponent } from './indicator-table/indicator-table.component';
import { SharedPageModule } from '../../shared/shared.module';
import { NgxPaginationModule } from 'ngx-pagination';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MetricsPageRoutingModule,
    SharedPageModule,
    NgxPaginationModule,
  ],
  declarations: [MetricsPage, IndicatorMetricsComponent, IndicatorGraphComponent, IndicatorTableComponent]
})
/**
 * Exporting class so it is externally accessible.
 */
export class MetricsPageModule {}
