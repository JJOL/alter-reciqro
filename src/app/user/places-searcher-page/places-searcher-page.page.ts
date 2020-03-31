import { Component, OnInit } from '@angular/core';
import { LugaresService } from 'src/app/core/services/lugares.service';
import { Place } from '../../core/models/lugar.model';

@Component({
  selector: 'app-places-searcher-page',
  templateUrl: './places-searcher-page.page.html',
  styleUrls: ['./places-searcher-page.page.scss'],
})
export class PlacesSearcherPagePage implements OnInit {

  places: Place[];

  constructor(
    private placesService: LugaresService
  ) { }

  async ngOnInit() {
    this.places = await this.placesService.getAllPlaces();


    console.log(this.places);

    let foundPlaces = await this.queryPlaces({lat: 20.605228, lng: -100.390471}, {lat: 20.601267, lng: -100.395625});
    console.log('Found Places');
    console.log(foundPlaces);
    
    
  }




  async onViewportChange(topLeftPos, botRightPos) {
    this.queryPlaces(topLeftPos, botRightPos);
  }


  async queryPlaces(topLeftPos, botRightPos) {
    return await this.placesService.searchMapPlaces(topLeftPos, botRightPos);
  }

}
