import { Component, OnInit } from '@angular/core';
import {WastesService} from '../core/services/wastes.service';
import {LugaresService} from '../core/services/lugares.service';

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
