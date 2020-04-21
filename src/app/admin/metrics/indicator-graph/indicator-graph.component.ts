import { Component, OnInit, Input } from '@angular/core';
import { IndicatorGraphService } from '../indicator-graph.service';

@Component({
  selector: 'app-indicator-graph',
  templateUrl: './indicator-graph.component.html',
  styleUrls: ['./indicator-graph.component.scss'],
})
export class IndicatorGraphComponent implements OnInit {

  datos: number[] = [1,2,3,45];

  @Input() instances: string[] = [];
  @Input() indicatorClassName: string;
  constructor(
    // private indicatorGraphService: IndicatorGraphService
  ) {}

  ngOnInit() {
  //   this.datos = this.indicatorGraphService.getDatos();
  }


  // chooseIndicatorInstance(instanceId: number) {
  //   let instance: IndicatorInstance = indicatorClassPool.getById(instanceId);

  // }
 
  // showData() {

  // }
  // caculateIndicatorData(indicator, lowerDate: Date, uperDate: Date) {
  //   this.indicatorGraphService.getOutputDataFor()
  // }



}
