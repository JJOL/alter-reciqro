import { Component, OnInit } from '@angular/core';
import { LugaresService } from 'src/app/core/services/lugares.service';
import { Place } from '../../core/models/lugar.model';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { InAppBrowserObject } from '@ionic-native/in-app-browser';
import { Platform } from '@ionic/angular';


@Component({
  selector: 'app-places-searcher-page',
  templateUrl: './places-searcher-page.page.html',
  styleUrls: ['./places-searcher-page.page.scss'],
})
export class PlacesSearcherPagePage implements OnInit {

  places: Place[];
  position: { lat: number, lng: number};
  placeSelected: Place;

  constructor(
    private placesService: LugaresService,
    private geolocationCont: Geolocation,
    private platform: Platform
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

    
  }

  gotoCenter(lat, lng){
    //console.log("lat " + lat + "lng " + lng);
    console.log(this.platform.platforms);
    if (this.platform.is('ios')) {
      // This will only print when on iOS
      new InAppBrowserObject('http://maps.apple.com/?daddr='+lat+','+lng);
     }else{
      new InAppBrowserObject('https://www.google.com/maps/dir//'+lat+','+lng+'/@'+lat+','+lng+',17z');
     }
  }

  async onViewportChange(bounds) {
    this.places = await this.queryPlaces({lat:bounds.getNorthEast().lat(), lng:bounds.getNorthEast().lng()}, {lat:bounds.getSouthWest().lat(), lng:bounds.getSouthWest().lng()});
  }


  async queryPlaces(topLeftPos, botRightPos) {
    return await this.placesService.searchMapPlaces(topLeftPos, botRightPos);
  }

  test (jaja) {
    this.placeSelected=jaja;
  }

}
