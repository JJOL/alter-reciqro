import { Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import {NgStyle, NgClass} from '@angular/common';
import { IonicModule } from '@ionic/angular';
import {WasteType} from '../../../core/models/waste-type';

@Component({
  selector: 'app-filter-button',
  templateUrl: './filter-button.component.html',
  styleUrls: ['./filter-button.component.scss'],
})
export class FilterButtonComponent implements OnInit {

  constructor() { }
  @Input() active : boolean = true;
  @Input() value : string = "";
  @Input() icon : string = "https://gravatar.com/avatar/dba6bae8c566f9d4041fb9cd9ada7741?d=identicon&f=y";
  @Output() selected = new EventEmitter<string>();
  @Output() unselected = new EventEmitter<string>();

  ngOnInit() {
  }
  select(){
    this.active = this.active?false:true;
    this.emit();
  }
  emit(){
    
    if(this.active) this.selected.emit(this.value);
    else this.unselected.emit(this.value);
  }
}
