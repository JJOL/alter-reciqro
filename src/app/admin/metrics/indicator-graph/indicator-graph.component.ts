import { Component, OnInit, Input, ViewChild, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';

import { IndicatorInstance } from '../services/DualIndicatorProvider';


declare const Chart: any;

export interface IGCParametersEvent {
  selectedInstance: IndicatorInstance
  lowerDate: Date
  upperDate: Date
}

@Component({
  selector: 'app-indicator-graph',
  templateUrl: './indicator-graph.component.html',
  styleUrls: ['./indicator-graph.component.scss'],
})
/**
 * IndicatorGraphComponent
 * Component that renders a line graph from a given collection of month data
 * from a given instance, and time interval.
 * It also inputs the parameters from the user to configure the data calculation.
 */
export class IndicatorGraphComponent implements OnInit, OnChanges {


  // Data Information
  lowerDate: Date;
  upperDate: Date;
  selectedInstance: IndicatorInstance;
  dataArr: number[];

  // Population Information
  @Input() instances: IndicatorInstance[];
  @Input() indicatorClassName: string;
  @Input() indicatorDisplayData: number[];

  @Output() dataParametersChange = new EventEmitter<IGCParametersEvent>();

  // Elements
  @ViewChild('chartCanvasEl', {static: true}) chartEl;

  constructor() {}
  /**
   * Load Test Initial Data
   */
  ngOnInit() {
    this.selectedInstance = { name: 'Centro Tec de Monterrey', id: '1' };
    this.lowerDate = new Date();
    this.lowerDate.setMonth(0);
    this.upperDate = new Date();
    this.indicatorDisplayData = [23,42,2,111,21,121,67,7,23,55,65,22,12,12,45,67,89,100,130];
    //this.onShowGraphFromData();
  }

  ngOnChanges(changes: SimpleChanges) {
    console.log(changes);
    if (this.inputPropHasChanged(changes, "indicatorDisplayData")) {
      console.log('Data has changed');
      this.onShowGraphFromData();
    }

    if (this.inputPropHasChanged(changes, "instances")) {
      this.selectedInstance = this.instances[0];
      console.log(this.instances);
      console.log('READY TO MAKE TEST');
    }
  }
  /**
   * Helper Function for checking if a property is within the changed properties of ngOnChanges()
   * @param  {SimpleChanges} changes
   * @param  {string} propName
   * @returns boolean
   */
  inputPropHasChanged(changes: SimpleChanges, propName: string): boolean {
    return changes[propName] && changes[propName].previousValue != changes[propName].currentValue;
  }

  /**
   * Function to execute to attemp to show data.
   */
  onShowGraphFromData() {
    this.selectedInstance = { name: 'Centro Tec de Monterrey', id: '1' };
    this.lowerDate = new Date();
    this.lowerDate.setMonth(1);
    this.upperDate = new Date();

    if (this.indicatorDisplayData && this.indicatorDisplayData.length > 0 && this.lowerDate && this.selectedInstance) {
      console.log('Displaying data');
      
      this.showGraphFromData(this.indicatorDisplayData, this.lowerDate, this.selectedInstance.name)
    }
  }

  /**
   * From metric data and a starting time show data.
   * @param  {number[]} dataArr
   * @param  {Date} startDate
   * @param  {string} selectedInstanceName
   */
  showGraphFromData(dataArr: number[], startDate: Date, selectedInstanceName: string) {
    let labelsArr = this.getMonthLabels(startDate, dataArr.length);

    let ctx = this.chartEl.nativeElement.getContext('2d');
    let chart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: labelsArr,
            datasets: [{
                label: `Frecuencia de Depositos en ${selectedInstanceName}`,
                // backgroundColor: 'rgb(255, 99, 132)',
                borderColor: 'rgb(255, 99, 132)',
                data: dataArr
            }]
        },

        options: {}
    });
  
  }
  /**
   * Returns an array of n month names starting from the month of startDate
   * @param  {Date} startDate
   * @param  {number} nMonths
   * @returns string[]
   */
  getMonthLabels(startDate: Date, nMonths: number): string[] {
    const MONTH_FULLNAMES_MAP = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre']

    let zeroMonth = startDate.getMonth();

    let monthLabelsArr: string[] = [];
    for (let i=zeroMonth; i < zeroMonth+nMonths; i++) {
      monthLabelsArr.push(MONTH_FULLNAMES_MAP[i % MONTH_FULLNAMES_MAP.length]);
    }

    return monthLabelsArr;
  }

  /**
   * Sends a valid ParametersChangeEvent to handler to furtherly calculate data.
   */
  sendParametersChangeEvent() {
    let changeEvent: IGCParametersEvent = {
      selectedInstance: this.selectedInstance,
      lowerDate: this.lowerDate,
      upperDate: this.upperDate
    };
    
    this.dataParametersChange.emit(changeEvent);
  }

}
