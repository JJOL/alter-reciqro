import { Component, OnInit, ViewChild, ElementRef, Input, Output, EventEmitter } from '@angular/core';
import {Place} from 'src/app/core/models/lugar.model';
import { LugaresService } from 'src/app/core/services/lugares.service';

declare const google: any;

@Component({
  selector: 'app-shared-google-map',
  templateUrl: './google-map.component.html',
  styleUrls: ['./google-map.component.scss'],
})
export class GoogleMapComponent implements OnInit {

  @ViewChild('map', { static: true }) mapElement;
  map: any;

  @Input() places: Place [] = [] ; 
  @Input() editable: boolean; 
  @Input() max: number;
  //Falta agregar un tipo coordenada
  @Output() placeChange = new EventEmitter(); 

  constructor( private placeTypeService: LugaresService) { }

  ngOnInit(){
    
    this.max = this.max==null?Number.MAX_SAFE_INTEGER:this.max;
    this.initMap();
    
  }

  initMap(){ 
    let coords = new google.maps.LatLng(20.610381, -100.382063);
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
          let place = {latitud:event.latLng.lat(), longitud: event.latLng.lng()};
          
          if(self.addPlace(place))
          {
          self.placeChange.emit(place);
          self.addMarker(new google.maps.LatLng(place.latitud, place.longitud));
          
          }
        });
    }

    if (this.places != null) {
    //Se acota deacuerdo al máximo
    let min = this.max<this.places.length? this.max:0;
    let max =  this.max>this.places.length?this.places.length-1:this.max+1;
    this.places = this.places.slice( min, max);
    for ( var place of this.places){
      this.addMarker(new google.maps.LatLng(place.location, place.location));
    }}
    
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
