import { Component, OnInit, OnChanges ,ViewChild, ElementRef, Input, Output, EventEmitter } from '@angular/core';
import {Place} from 'src/app/core/models/lugar.model';
import { LugaresService } from 'src/app/core/services/lugares.service';
import { Observable,from } from 'rxjs';
declare const google: any;


const DEFAULT_CENTER_COORD = new google.maps.LatLng(20.610381, -100.382063);


@Component({
  selector: 'app-shared-google-map',
  templateUrl: './google-map.component.html',
  styleUrls: ['./google-map.component.scss'],
})
export class GoogleMapComponent implements OnInit, OnChanges {

  @ViewChild('map', { static: true }) mapElement;
  map: google.maps.Map;

  @Input() places: Place[] = [] ; 
  @Input() editable: boolean; 
  @Input() max: number;
  @Input() center: {
    lat: number,
    lng: number
  } = {
    lat: 20.610381,
    lng: -100.382063
  };
  //Falta agregar un tipo coordenada
  @Output() placeChange = new EventEmitter(); 

  constructor( private placeTypeService: LugaresService) { }

  

  ngOnInit(){
    this.max = this.max==null?Number.MAX_SAFE_INTEGER:this.max;
    this.initMap();
  }

  ngOnChanges() {

    if (this.center && this.map) 
      this.map.setCenter(this.center)


    if (this.places && this.map) {
      console.log('GoogleMap', this.places);

      //Se acota deacuerdo al máximo
      // let min = this.max<this.places.length ? this.max : 0;
      let max =  this.max < this.places.length ? this.max : this.places.length;

      this.places = this.places.slice(0, max);
      for ( var place of this.places){
        this.addMarker(new google.maps.LatLng(place.location.lat, place.location.lng));
      }}
  }

  initMap(){
    
    let coords = DEFAULT_CENTER_COORD;
    let mapOptions: google.maps.MapOptions = {
      center: coords,
      zoom: 14,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    }

    this.map = new google.maps.Map(this.mapElement.nativeElement, 
      mapOptions)
    
      if(this.editable){
        let self = this;
        google.maps.event.addListener(this.map, 'click', function(event) {
          let place = {
            lat: event.latLng.lat(),
            lng: event.latLng.lng()
          };
          
          if(self.addPlace(place))
          {
          self.placeChange.emit(place);
          self.addMarker(new google.maps.LatLng(place.lat, place.lng));
          
          }
        });
    }

    
    
  }

  //Hay que ver la forma de explorar hacer tipos más pequeños
  addPlace(place){
    if(this.places.length<this.max){
      this.places.push(place);
      return true;
    }
    return false;
  }

  addMarker(location){
    let marker: google.maps.Marker = new google.maps.Marker({
      map: this.map,
      position:  location,
    //  title: place.descripcion,
      draggable: this.editable ? true : false,
      animation: google.maps.Animation.DROP
  });
  let self = this;
  marker.addListener('dragend', function(event) {
    let place = {latitud:event.latLng.lat(), longitud: event.latLng.lng()};
    self.placeChange.emit(place);
  });

  }
}
