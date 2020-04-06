import { Component, OnInit } from '@angular/core';
import {WastesService} from '../core/services/wastes.service';
import {PlacesService} from '../core/services/places.service';

@Component({
  selector: 'app-shared',
  templateUrl: './shared.page.html',
  styleUrls: ['./shared.page.scss'],
})
export class SharedPage implements OnInit {

  constructor() { }

  ngOnInit() {
    

  }
  test(filters:[]){
  
}
}
