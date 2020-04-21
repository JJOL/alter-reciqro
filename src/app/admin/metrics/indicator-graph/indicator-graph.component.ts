import { Component, OnInit, Input, ViewChild } from '@angular/core';

import { IndicatorInstance } from '../DualIndicatorProvider';


declare const Chart: any;

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
export class IndicatorGraphComponent implements OnInit {

  // Data Information
  lowerDate: Date;
  upperDate: Date;
  selectedInstance: IndicatorInstance;
  dataArr: number[];

  // Population Information
  @Input() instances: IndicatorInstance[] = [];
  @Input() indicatorClassName: string;

  // Elements
  @ViewChild('chartCanvasEl', {static: true}) chartEl;

  constructor() {}
  /**
   * Load Test Initial Data
   */
  ngOnInit() {
    this.selectedInstance = { name: 'Centro Tec de Monterrey' };
    this.lowerDate = new Date();
    this.lowerDate.setMonth(1);
    this.dataArr = [23,42,2,111,21,121,67,7,23,55,65,22,12,12,45,67,89,100,130];
    this.onShowGraphFromData();
  }

  /**
   * Function to execute to attemp to show data.
   */
  onShowGraphFromData() {
    if (this.dataArr && this.dataArr.length > 0 && this.lowerDate) {
      this.showGraphFromData(this.dataArr, this.lowerDate, this.selectedInstance.name)
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
   * @returns string
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

}
