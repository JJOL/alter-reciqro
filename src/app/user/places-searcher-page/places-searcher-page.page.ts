import { Component, OnInit } from '@angular/core';
import { LugaresService } from 'src/app/core/services/lugares.service';
import { Place } from '../../core/models/lugar.model';

import { Geolocation } from '@ionic-native/geolocation/ngx';

@Component({
  selector: 'app-places-searcher-page',
  templateUrl: './places-searcher-page.page.html',
  styleUrls: ['./places-searcher-page.page.scss'],
})
export class PlacesSearcherPagePage implements OnInit {

  places: Place[];
  position: { lat: number, lng: number};

  constructor(
    private placesService: LugaresService,
    private geolocationCont: Geolocation
  ) { }

  async ngOnInit() {

    try {
      let geoPosition = await this.geolocationCont.getCurrentPosition();
      console.log(geoPosition);

      this.position = {
        lat: geoPosition.coords.latitude,
        lng: geoPosition.coords.longitude
      };
    } catch (err) {
      console.log(err);
    }


    this.places = await this.placesService.getAllPlaces();


    console.log(this.places);

    // let foundPlaces = await this.queryPlaces({lat: 20.618336, lng:   -100.394293},
    //    {lat: 20.616157, lng:  -100.391332}
    //    );
    // console.log('Found Places');
    // console.log(foundPlaces);
    
    
    
  }

  async onViewportChange(bounds) {
    this.places = await this.queryPlaces({lat:bounds.getNorthEast().lat(), lng:bounds.getNorthEast().lng()}, {lat:bounds.getSouthWest().lat(), lng:bounds.getSouthWest().lng()});
  }


  async queryPlaces(topLeftPos, botRightPos) {
    return await this.placesService.searchMapPlaces(topLeftPos, botRightPos);
  }

  test (jaja) {
    console.log(jaja.getNorthEast(), jaja.getSouthWest());
  }

}
