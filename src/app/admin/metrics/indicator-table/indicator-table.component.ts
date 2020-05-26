import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-indicator-table',
  templateUrl: './indicator-table.component.html',
  styleUrls: ['./indicator-table.component.scss'],
})
/**
 * Class: IndicatorTableComponent
 * User Story ID: M1NG6
 * Description: Table component that contains key-value data from a given dataset.
 * @Input { [key: string]: number } keyValueData
 */
export class IndicatorTableComponent implements OnChanges {

  @Input() keyValueData: { [key: string]: number };
  dataArr: { key: string, val: number }[];
  actualPage = 1;

  // eslint-disable-next-line require-jsdoc
  constructor() { }

  /**
   *
   * User Story ID: M1NG6
   * Changes the map
   * @param  {SimpleChanges} changes
   * @returns void
   * eslint-disable-next-line @typescript-eslint/no-unused-vars
   */
  ngOnChanges(changes: SimpleChanges): void {
    if (this.keyValueData) {
      this.dataArr = Object.keys(this.keyValueData)
          .map(key => ({ 
            key: key,
            val: this.keyValueData[key]
          }));
    }
  }
}
