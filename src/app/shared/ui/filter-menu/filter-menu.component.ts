import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import {NgForOf, NgIf} from '@angular/common';
import {WasteType} from '../../../core/models/waste-type';
import {ModalController } from '@ionic/angular';

@Component({
  selector: 'app-filter-menu',
  templateUrl: './filter-menu.component.html',
  styleUrls: ['./filter-menu.component.scss'],
})

export class FilterMenuComponent implements OnInit {

  constructor(public modalCtrl: ModalController) {}
  @Input() filters: WasteType [] = [];
  @Input() activeFilters: WasteType [] = [];


  ngOnInit() {
  }

  add(filter) {
    this.activeFilters.push(filter);
  }
  remove(filter) {
    this.activeFilters = this.activeFilters.filter(item => item !== filter);
  }
  dismiss() {
    this.modalCtrl.dismiss(this.activeFilters);
  }


}
