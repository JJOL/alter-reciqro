import { Component, OnInit } from '@angular/core';
//import {PlacesService} from '../core/services/places.service';

@Component({
  selector: 'app-shared',
  templateUrl: './shared.page.html',
  styleUrls: ['./shared.page.scss'],
})
export class SharedPage implements OnInit {

  constructor(/*private service:PlacesService*/) { }

  ngOnInit() {
    //this.service.getAllWasteTypes().then(types => this.service.getPlacesByWaste(["0pBVMBkSLD6F7yIk6lih"]).then( result => console.log(result)))
    
  }
  test(filters:[]){
  
}
}
