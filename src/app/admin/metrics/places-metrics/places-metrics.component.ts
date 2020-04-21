import { Component, OnInit, Input } from '@angular/core';
import { DualIndicatorProvider } from '../DualIndicatorProvider';
import { IGCParametersEvent } from '../indicator-graph/indicator-graph.component';

@Component({
  selector: 'app-places-metrics',
  templateUrl: './places-metrics.component.html',
  styleUrls: ['./places-metrics.component.scss'],
})
/**
 * PlacesMetricsComponent
 * Class responsible for communicating user actions and indicator metrics percepts with metrics service.
 */
export class PlacesMetricsComponent implements OnInit {


  instances: string[];
  indicatorClassName: string;

  graphDataArr: number[];

  @Input() classMetricsService: DualIndicatorProvider;
  constructor() {}

  ngOnInit() {
    this.initData();
  }
  /**
   * Attems to load metrics meta data from Class Population Metrics Provider
   */
  initData() {
    if (this.classMetricsService) {
      this.classMetricsService.loadMetaData(this.loadedMetricsMetaData.bind(this));
    }
  }
  /**
   * Callback when MetricsProvider has loaded and is safe to request metadata.
   */
  loadedMetricsMetaData() {
    this.indicatorClassName = this.classMetricsService.getClassName();
    this.instances = this.classMetricsService.getAvailableInstances();
  }
  /**
   * Handler for handling user input parameter change event from IndicatorGraphComponent
   * It loads new calculated metrics data from the service.
   * @param  {IGCParametersEvent} event
   */
  onUserGraphInput(event: IGCParametersEvent) {
    this.classMetricsService.calculateGraphData(event.lowerDate, event.upperDate, event.selectedInstance)
    .then(this.onCalculatedGraphData.bind(this));
  }
  /**
   * Callback executed by MetricsService when calculated data is ready for displaying.
   * @param  {number[]} graphDataArr
   */
  onCalculatedGraphData(graphDataArr: number[]) {
    this.graphDataArr = graphDataArr;
  }

}
