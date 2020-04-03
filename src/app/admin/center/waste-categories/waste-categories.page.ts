import { Component, OnInit } from '@angular/core';
import { LugaresService } from 'src/app/core/services/lugares.service';

@Component({
  selector: 'app-trash-categories',
  templateUrl: './waste-categories.page.html',
  styleUrls: ['./waste-categories.page.scss'],
})
export class WasteCategoriesPage implements OnInit {

  placeTypes : any [];

  constructor(private placesService: LugaresService) { 
  }

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.placesService.allPlaceTypes().then( data => { this.placeTypes=data});
  }
}
