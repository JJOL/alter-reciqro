import { Component, OnInit } from '@angular/core';
import { IndicatorGraphService } from '../indicator-graph.service';

@Component({
  selector: 'app-places-metrics',
  templateUrl: './places-metrics.component.html',
  styleUrls: ['./places-metrics.component.scss'],
})
export class PlacesMetricsComponent implements OnInit {


  // instances: string[] = ["Perro", "Gato", "Nini"];
  // indicatorClassName: string = "Centros";


  constructor(
    private indicatorGraphService: IndicatorGraphService
    ) {}

  ngOnInit() {
    // this.indicatorGraphService.loadInstances(this.onIndicatorInstancesLoad.bind(this));
    // this.indicatorGraphService.loadInstances((i) => this.onIndicatorInstancesLoad(i))
  }

  onIndicatorInstancesLoad(instances) {
    // this.instances = instances;
  }

}
