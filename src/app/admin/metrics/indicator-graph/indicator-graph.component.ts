import { Component, Input, ViewChild, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';

import { IndicatorInstance } from '../services/DualIndicatorProvider';
import { NavController, AlertController } from '@ionic/angular';


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
export class IndicatorGraphComponent implements OnChanges {


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
  inLowerDateStr: string;
  inUpperDateStr: string;

  // eslint-disable-next-line require-jsdoc
  constructor(
    private navCtrl: NavController,
    private alertCtrl: AlertController
  ) {}
  /**
   * User Story ID: M1NG6
   * Change the grpah
   * @param  {SimpleChanges} changes
   */
  ngOnChanges(changes: SimpleChanges) {
    if (this.inputPropHasChanged(changes, 'indicatorDisplayData')) {
      this.onShowGraphFromData();
    }

  }
  /**
   * User Story ID: M1NG6
   * Helper Function for checking if a property is within the changed properties of ngOnChanges()
   * @param  {SimpleChanges} changes
   * @param  {string} propName
   * @returns boolean
   */
  inputPropHasChanged(changes: SimpleChanges, propName: string): boolean {
    return changes[propName] && changes[propName].previousValue !== changes[propName].currentValue;
  }

  /**
   * User Story ID: M1NG6
   * Function to execute to attemp to show data.
   */
  onShowGraphFromData() {
    if (this.indicatorDisplayData && this.indicatorDisplayData.length > 0 && this.lowerDate && this.selectedInstance) {
      this.showGraphFromData(this.indicatorDisplayData, this.lowerDate, this.selectedInstance.name)
    }
  }

  /**
   * User Story ID: M1NG6
   * From metric data and a starting time show data.
   * @param  {number[]} dataArr
   * @param  {Date} startDate
   * @param  {string} selectedInstanceName
   */
  showGraphFromData(dataArr: number[], startDate: Date, selectedInstanceName: string) {
    let labelsArr = this.getMonthLabels(startDate, dataArr.length);

    let ctx = this.chartEl.nativeElement.getContext('2d');
    new Chart(ctx, {
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
   * User Story ID: M1NG6
   * Returns an array of n month names starting from the month of startDate
   * @param  {Date} startDate
   * @param  {number} nMonths
   * @returns string[]
   */
  getMonthLabels(startDate: Date, nMonths: number): string[] {
    const MONTH_FULLNAMES_MAP = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 
      'Septiembre', 'Octubre', 'Noviembre', 'Diciembre']

    let zeroMonth = startDate.getMonth();

    let monthLabelsArr: string[] = [];
    for (let i=zeroMonth; i < zeroMonth+nMonths; i++) {
      monthLabelsArr.push(MONTH_FULLNAMES_MAP[i % MONTH_FULLNAMES_MAP.length]);
    }

    return monthLabelsArr;
  }

  /**
   * User Story ID: M1NG6
   * Sends a valid ParametersChangeEvent to handler to furtherly calculate data.
   */
  sendParametersChangeEvent() {
    /* TODO: Validar los parametros */
    this.lowerDate = new Date(this.inLowerDateStr);
    this.upperDate = new Date(this.inUpperDateStr);
    if(this.lowerDate  !== undefined && this.upperDate !== undefined && this.selectedInstance !== undefined){
      let changeEvent: IGCParametersEvent = {
        selectedInstance: this.selectedInstance,
        lowerDate: this.lowerDate,
        upperDate: this.upperDate
      };
      this.dataParametersChange.emit(changeEvent);
    }else{
      this.alertCtrl.create ({
        header: 'Atención',
        message: 'Es necesario completar los campos para generar la gráfica.',
        buttons: [{
          text: 'Aceptar',
          role: 'cancel'
        }]
      }).then(alertEl => {
        alertEl.present();
      });
    }
    
  }

}
