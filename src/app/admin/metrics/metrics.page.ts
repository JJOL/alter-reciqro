import { Component, OnInit } from '@angular/core';
import { DualIndicatorProvider, IndicatorInstance } from './DualIndicatorProvider';

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
    // private metricsService: MetricsFacade
  ) { }

  ngOnInit() {
    this.placesMetricsService = new PlacesDualIndicatorProvider();
  }

}

class PlaceIndicatorInstance implements IndicatorInstance {
  name: string;
  id: string;
  constructor(name: string, id: string) {
    this.name = name;
    this.id = id;
  }
}
class PlacesDualIndicatorProvider implements DualIndicatorProvider{

  instances: IndicatorInstance[] = [
    new PlaceIndicatorInstance("Tec de Monterrey", "1"),
    new PlaceIndicatorInstance("Centro DIF", "2"),
    new PlaceIndicatorInstance("Plaza de las Americas", "3"),
  ];
  loadMetaData(onMetadaLoadedCb: () => void) {
    onMetadaLoadedCb();
  }
  getClassName(): string {
    return 'Centros';
  }
  getMetricName(): string {
    return 'fs';
  }
  getAvailableInstances() {
    return this.instances;
  }
  calculateGraphData(lowerExclusiveDate: Date, upperExclusiveDate: Date, instance: any): Promise<number[]> {
    return Promise.resolve([1,2,3,4,5,6,7,7,8,8,9,12,14,10,9,5,4,3,2,0])
  }
  getOverallMetrics() {
    throw new Error("Method not implemented.");
  }

}