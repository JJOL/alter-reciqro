import { TipoInstalacion } from 'src/app/core/models/tipo-instalacion.model';
import { SharedPage } from './../../shared/shared.page';
import { Component, OnInit, ViewChild, EventEmitter, Output } from '@angular/core';
import { LugaresService } from 'src/app/core/services/lugares.service';
import {WastesService} from 'src/app/core/services/wastes.service';
import { ModalController } from '@ionic/angular';
import { Place } from '../../core/models/lugar.model';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import {MarkerCardComponent} from '../marker-card/marker-card.component';

@Component({
  selector: 'app-places-searcher-page',
  templateUrl: './places-searcher-page.page.html',
  styleUrls: ['./places-searcher-page.page.scss'],
})

export class PlacesSearcherPagePage implements OnInit {
  classname={
    'ly-grid-map': true,
    'ion-no-padding': true
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
    public modalController: ModalController,
  ) { }

  async ngOnInit() {

    

    try {
      let geoPosition = await this.geolocationCont.getCurrentPosition();

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
  async presentModal() {
    const modal = await this.modalController.create({
      component: MarkerCardComponent,
      componentProps: {
        'placeSelected':this.placeSelected,
        'loadedPlaceType':this.loadedPlaceType,
      }
    });
    return await modal.present();
  }

  async presentFilterModal() {
    const modal = await this.modalController.create({
      //cahnge component
      component: MarkerCardComponent,
      componentProps: {
        'placeSelected':this.placeSelected,
        'loadedPlaceType':this.loadedPlaceType,
      }
    });
    return await modal.present();
  }

  emitPlace (place) {
    this.placeSelected=place;
    console.log(this.placeSelected);
    //get placeType
    if (this.placeSelected.places_type.id) {
      this.placesService.getPlaceTypeByID(""+this.placeSelected.places_type.id).then(placeType => {
        this.loadedPlaceType = placeType;
        this.presentModal();
      });
    } else {
      this.loadedPlaceType = {
        id: "",
        name: "¡Error! No se pudo cargar, el lugar no está asociado a un tipo de lugar",
        icon: ""
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
