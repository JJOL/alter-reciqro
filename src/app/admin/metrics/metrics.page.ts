import { Component, OnInit } from '@angular/core';
import { DualIndicatorProvider } from './services/DualIndicatorProvider';
import { MetricsPageService } from './services/metrics-page.service';

@Component({
  selector: 'app-metrics',
  templateUrl: './metrics.page.html',
  styleUrls: ['./metrics.page.scss'],
})
export class MetricsPage implements OnInit {


  placesMetricsService: DualIndicatorProvider;
  delegationMetricsService: DualIndicatorProvider;
  systemMetricsService: DualIndicatorProvider;

  constructor(
      private metricsPageService: MetricsPageService
  ) { }

  ngOnInit() {
    this.delegationMetricsService = this.metricsPageService.getDelegationsMetricsProvider();
    this.placesMetricsService = this.metricsPageService.getPlacesMetricsProvider();
  }

}

