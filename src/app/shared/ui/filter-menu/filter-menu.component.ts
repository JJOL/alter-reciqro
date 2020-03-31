import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import {NgForOf, NgIf} from '@angular/common';
import {WastesService} from '../../../core/services/wastes.service';
import {WasteType} from '../../../core/models/waste-type';

@Component({
  selector: 'app-filter-menu',
  templateUrl: './filter-menu.component.html',
  styleUrls: ['./filter-menu.component.scss'],
})

export class FilterMenuComponent implements OnInit {
  
  constructor(private service: WastesService) {}
  @Input() filters : WasteType [] = [];
  activeFilters = this.filters;
  @Output() change = new EventEmitter<WasteType[]>();

  ngOnInit() {
     this.service.getAllWasteTypes().then( data => { this.filters=data});
  }

  add(filter){
    this.activeFilters.push(filter);
    this.change.emit(this.activeFilters);
  }
  remove(filter){
    this.activeFilters=this.activeFilters.filter(item => item !== filter);
    this.change.emit(this.activeFilters);
  }
}
