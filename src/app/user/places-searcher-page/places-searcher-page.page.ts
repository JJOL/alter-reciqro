import { TipoInstalacion } from 'src/app/core/models/tipo-instalacion.model';
import { SharedPage } from './../../shared/shared.page';
import { Component, OnInit, ViewChild, EventEmitter, Output } from '@angular/core';
import { LugaresService } from 'src/app/core/services/lugares.service';
import {WastesService} from 'src/app/core/services/wastes.service';

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
  classname={
    'ly-grid-map': true,
    'ion-no-padding': true,
    'ly-grid-filter': false
  }
  
  loadedPlaceType: TipoInstalacion;
  places: Place[];
  position: { lat: number, lng: number};
  placeSelected: Place;
  @ViewChild ('mapElement', {static: true}) map;

  @Output() changeView = new EventEmitter();
  
  constructor(
    private placesService: LugaresService,
    private wasteService: WastesService,
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
      this.map.setCenter(this.position);
    } catch (err) {
      console.log(err);
    }
    this.places = await this.placesService.getAllPlaces();

  }

  // gotoCenter(lat, lng){
  //   console.log("lat " + lat + "lng " + lng);
  //   console.log(this.platform.platforms);
  //   if (this.platform.is('ios')) {
  //     // This will only print when on iOS
  //     // new InAppBrowserObject('http://maps.apple.com/?daddr='+lat+','+lng);
  //    }else{
  //     // new InAppBrowserObject('https://www.google.com/maps/dir//'+lat+','+lng+'/@'+lat+','+lng+',17z');
  //    }
  // }

  async onViewportChange(bounds) {
    this.places = await this.queryPlaces({lat:bounds.getNorthEast().lat(), lng:bounds.getNorthEast().lng()}, {lat:bounds.getSouthWest().lat(), lng:bounds.getSouthWest().lng()});
  }


  async queryPlaces(topLeftPos, botRightPos) {
    return await this.placesService.searchMapPlaces(topLeftPos, botRightPos);
  }
  selectMarker(){
    this.changeToVisible();
    this.classname= {
      'ion-no-padding': true,
      'ly-grid-map': false,
      'ly-grid-filter': true
    }
    return this.classname;
  }


  emitPlace (place) {
    this.selectMarker();
    this.placeSelected=place;
    console.log(this.placeSelected);
    //get placeType
    if (this.placeSelected.places_type.id) {
      this.placesService.getPlaceTypeByID(""+this.placeSelected.places_type.id).then(placeType => {
        this.loadedPlaceType = placeType;
      });
    } else {
      this.loadedPlaceType = {
        id: "",
        name: "¡Error! No se pudo cargar, el lugar no está asociado a un tipo de lugar",
        description: ""
      };
    }
  }


  filterByType(filters){
    if(filters.length!=0){
      this.wasteService.getPlacesByType(filters).then(data => {
        let places:Place[] = [];
        for(let place_type of data)
        {
          this.placesService.getPlaceByID(place_type.place).then(lugar => places.push(lugar));
        }  
        return places;
      }).then(data => {console.log(data)});
    }
    
  }

  



  openFilters(){
    this.changeToVisible();
    this.classname= {
      'ion-no-padding': true,
      'ly-grid-map': false,
      'ly-grid-filter': true
    }
    return this.classname;
  }
  
  changeToVisible(){
    var cancel= document.getElementById("cancel");
    cancel.style.visibility="visible";
    var flag=false;
    console.log(flag);
    this.changeView.emit(flag);
  }

  changeToInVisible(){
    var cancel= document.getElementById("cancel");
    cancel.style.visibility="hidden";
    var flag=true;
    this.changeView.emit(flag);
    console.log(flag);
  }
  closeFilters(){
    this.changeToInVisible();
    this.classname= {
      'ly-grid-filter': false,
      'ion-no-padding': true,
      'ly-grid-map': true
    }
    return this.classname;
  }

  
  viewQro(){
    this.map.setCenter({lat:20.588772, lng:-100.390292});
    this.map.setZoom(12);
  }


/*
  goToCenter(lat, lng){
    //console.log("lat " + lat + "lng " + lng);
    console.log(this.platform.platforms);
    if (this.platform.is('ios')) {
      // This will only print when on iOS
      new InAppBrowserObject('http://maps.apple.com/?daddr='+lat+','+lng);
     }else{
      new InAppBrowserObject('https://www.google.com/maps/dir//'+lat+','+lng+'/@'+lat+','+lng+',17z');
     }
  }*/

}
