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
<<<<<<< HEAD
/**
 * Exporting class so it is externally accessible.
 */
=======
// eslint-disable-next-line require-jsdoc
>>>>>>> cd26d114c6620eb28928b5f140627823fbb2a25d
export class MetricsPageModule {}
