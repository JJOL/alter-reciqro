import { Component, OnInit, Input } from '@angular/core';
import {WasteType} from '../../../core/models/waste-type';
import { PopoverController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-filter-menu',
  templateUrl: './filter-menu.component.html',
  styleUrls: ['./filter-menu.component.scss'],
})
/**
 * US ID: M1NC2
 * Filter Menu Component, it will renderer by popover controller
 */
export class FilterMenuComponent implements OnInit {
  
  // eslint-disable-next-line require-jsdoc, max-params
  constructor(public popoverController: PopoverController, private router: Router) {}
  @Input() filters: WasteType [] = [];
  @Input() activeFilters: WasteType [] = [];

  // eslint-disable-next-line require-jsdoc
  ngOnInit() {
  }
  /**
   *  US ID: M1NC2
   * @param  {} filter
   * Adds a filter to the active array
   */
  add(filter) {
    this.activeFilters.push(filter);
  }
  /**
   *  US ID: M1NC2
   * Removes a filter from the active array
   * @param  {} filter
   */
  remove(filter) {
    this.activeFilters = this.activeFilters.filter(item => item !== filter);
  }
  
  /**
   *  US ID: M1NC2
   * Returns active filter by popover controller dismiss function
   */
  dismiss() {
    this.popoverController.dismiss(this.activeFilters);
  }

  /**
   *  US ID: M1NC2
   * Dismisses the modal and redirect to info waste
   */
  wasteInfo() {
    this.popoverController.dismiss(this.activeFilters);
    this.router.navigate(['/user/info/waste/']);
  }

  

  /**
   * US ID: M1NC2
   * Changes the current checkbox status by checking the active filter array
   * @param  {} ev
   */
  check(ev){
    if(ev.detail.checked){
      this.add(ev.detail.value);
    }
    else {
      this.remove(ev.detail.value);
    }
  }


}
