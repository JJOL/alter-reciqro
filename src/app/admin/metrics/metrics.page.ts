import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-metrics',
  templateUrl: './metrics.page.html',
  styleUrls: ['./metrics.page.scss'],
})
export class MetricsPage implements OnInit {


  // delegationDataProvider: DualIndicatorProvider;
  // placesDataProvider:     DualIndicatorProvider;


  constructor(
    // private metricsService: MetricsFacade
  ) { }

  ngOnInit() {
    // this.delegationDataProvider = this.metricsService.getPlacesProvider();
    // this.placesDataProvider     = this.metricsService.getPlacesProvider();
  }

}
