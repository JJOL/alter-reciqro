import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import {NgForOf, NgIf} from '@angular/common';
import {WasteType} from '../../../core/models/waste-type';
import { PopoverController } from '@ionic/angular';

@Component({
  selector: 'app-filter-menu',
  templateUrl: './filter-menu.component.html',
  styleUrls: ['./filter-menu.component.scss'],
})

export class FilterMenuComponent implements OnInit {

  constructor(public popoverController: PopoverController) {}
  @Input() filters: WasteType [] = [];
  @Input() activeFilters: WasteType [] = [];


  ngOnInit() {
  }

  add(filter) {
    this.activeFilters.push(filter);
    console.log(filter)
  }
  remove(filter) {
    this.activeFilters = this.activeFilters.filter(item => item !== filter);
  }
  dismiss() {
    this.popoverController.dismiss(this.activeFilters);
  }
  check(ev){
    if(ev.detail.checked){
      this.add(ev.detail.value);
    }
    else {
      this.remove(ev.detail.value);
    }
  }


}
