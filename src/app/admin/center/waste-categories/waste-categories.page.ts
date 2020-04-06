import { Component, OnInit } from '@angular/core';
import { PlacesService } from 'src/app/core/services/places.service';

@Component({
  selector: 'app-trash-categories',
  templateUrl: './waste-categories.page.html',
  styleUrls: ['./waste-categories.page.scss'],
})
export class WasteCategoriesPage implements OnInit {

  placeTypes : any [];

  constructor(private placesService: PlacesService) { 
  }

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.placesService.allPlaceTypes().then( data => { this.placeTypes=data});
  }
}
