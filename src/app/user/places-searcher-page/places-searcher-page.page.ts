import { TipoInstalacion } from 'src/app/core/models/tipo-instalacion.model';
import { SharedPage } from './../../shared/shared.page';
import { Component, OnInit, ViewChild, EventEmitter, Output } from '@angular/core';
import { PlacesService } from 'src/app/core/services/places.service';
import { ModalController } from '@ionic/angular';
import { Place } from '../../core/models/place.model';
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
    private placesService: PlacesService,
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
    this.places = await this.filterByType(["Y0fyyM3URa9hwkKgxWN3","gvgouJxdtD22qN0mU8Ty"])
    console.log(this.places)
    //this.placesService.getIDPlacesByPlacesType([{place_type:"6sYHE4U4kung8EFmhyJL"}])
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
 /* async presentModal() {
    const modal = await this.modalController.create({
      component: MarkerCardComponent,
      cssClass:'my-custom-modal-css',
      componentProps: {
        'placeSelected':this.placeSelected,
        'loadedPlaceType':this.loadedPlaceType,
      }
    });
    return await modal.present();
  }*/

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
        //this.presentModal();
      });
    } else {
      this.loadedPlaceType = {
        id: "",
        name: "¡Error! No se pudo cargar, el lugar no está asociado a un tipo de lugar",
        icon_url: ""
      };
    }
  }


  async filterByType(filters){
    if(filters.length!=0){
      return this.placesService.getIDPlacesTypesByWaste(filters).then(dataplacetype => {
           return this.placesService.getIDPlacesByPlacesType(dataplacetype).then( place => {return place});
      });
    }
    
  }

  

  

  
  viewQro(){
    this.map.setCenter({lat:20.588772, lng:-100.390292});
    this.map.setZoom(12);

    this.placeSelected = null;
  }

  onMapInteract() {
    console.log('MAP INTERACT');
    
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
