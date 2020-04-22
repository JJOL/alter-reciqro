import { Component, OnInit } from '@angular/core';
import { DualIndicatorProvider } from './services/DualIndicatorProvider';
import { MetricsPageService } from './services/metrics-page.service';

@Component({
  selector: 'app-metrics',
  templateUrl: './metrics.page.html',
  styleUrls: ['./metrics.page.scss'],
})
/**
 * MetricsPage
 * User Story ID: M1NG6
 * Description: Page that contains 3 Indicator Metrics and gets metrics providers
 */
export class MetricsPage implements OnInit {


  placesMetricsService: DualIndicatorProvider;
  delegationMetricsService: DualIndicatorProvider;
  systemMetricsService: DualIndicatorProvider;

  constructor(
      private metricsPageService: MetricsPageService
  ) { }
  
  /**
   * User Story ID: M1NG6
   * Description: It gets the metrics providers for the IndicatorGraphicsComponents.
   */
  ngOnInit() {
    this.delegationMetricsService = this.metricsPageService.getDelegationsMetricsProvider();
    this.placesMetricsService = this.metricsPageService.getPlacesMetricsProvider();
    this.systemMetricsService = this.metricsPageService.getSystemMetricsProvider();
  }

}

