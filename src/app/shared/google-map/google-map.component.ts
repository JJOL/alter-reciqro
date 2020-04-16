import { Component, OnInit, OnChanges ,ViewChild, ElementRef, Input, Output, EventEmitter } from '@angular/core';
import {Place} from 'src/app/core/models/place.model';
import { PlacesService } from 'src/app/core/services/places.service';
import { Observable,from } from 'rxjs';
declare const google: any;


const DEFAULT_CENTER_COORD = new google.maps.LatLng(20.588772, -100.390292);


@Component({
  selector: 'app-shared-google-map',
  templateUrl: './google-map.component.html',
  styleUrls: ['./google-map.component.scss'],
})
export class GoogleMapComponent implements OnInit, OnChanges {
//static true sino depende de una variable por ejemplo que tenga algun ngif
  @ViewChild('map', { static: true }) mapElement;
  map: google.maps.Map;

  @Input() places: Place[] = [] ; 
  @Input() editable: boolean; 
  @Input() max: number;
  @Input() center: any  = {
    lat: 20.610381,
    lng: -100.382063
  };
  currentInfoWindow : any ;
  markers : any[] = [];
  //Falta agregar un tipo coordenada
  @Output() placeChange = new EventEmitter(); 
  @Output() change = new EventEmitter();
  @Output() seletedMarker = new EventEmitter<Place>();
  toloaded : boolean = true;
  constructor() { }

  

  ngOnInit(){
    this.max = this.max==null?Number.MAX_SAFE_INTEGER:this.max;
    this.initMap();
    //this.setCenter(new google.maps.LatLng(this.center.lat, this.center.lng))
  }

  ngOnChanges() {
    if(this.center && this.toloaded && this) {
     // this.setCenter(this.center);
      this.toloaded=false;
    }
    for(let marker of this.markers){
      marker.setMap(null);
    }
    this.markers = [];
    
  

    if (this.places && this.map) {

      //Se acota deacuerdo al máximo
      // let min = this.max<this.places.length ? this.max : 0;
      let max =  this.max < this.places.length ? this.max : this.places.length;
      this.places = this.places.slice(0, max);
      for ( var place of this.places){
        this.addMarker(place);
      }}
  }

  initMap(){
    
    let mapOptions: google.maps.MapOptions = {
      center: DEFAULT_CENTER_COORD,
      zoom: 15,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    }

    this.map = new google.maps.Map(this.mapElement.nativeElement, 
      mapOptions)

      google.maps.event.addListener(this.map, 'idle', () => {
        this.change.emit(this.map.getBounds());
      } );
    
      if(this.editable){
        
        google.maps.event.addListener(this.map, 'click', event => {
          let place = { 
            location: {
            lat: event.latLng.lat(),
            lng: event.latLng.lng()}
          };
          
          if(this.addPlace(place))
          {
          this.placeChange.emit(place);
          this.addMarker(place);
          
          }
        });
    }

    
    
  }

  //Hay que ver la forma de explorar hacer tipos más pequeños
  addPlace(place){
    if(this.places.length<this.max){
      return this.places.push(place);
    }
    return 0;
  }
  
  setCenter(coord){
    return this.map.setCenter(coord);
  }
  setZoom(zoom){
    this.map.setZoom(zoom);
  }
  addMarker(place){

    let marker: google.maps.Marker = new google.maps.Marker({
      map: this.map,
      position:  new google.maps.LatLng(place.location.lat, place.location.lng),
    //  title: place.descripcion,
      draggable: this.editable ? true : false,
     // animation: google.maps.Animation.DROP
  });
  marker.addListener('dragend', event =>{
    let place = { 
      location: {
      lat: event.latLng.lat(),
      lng: event.latLng.lng()}
    };
    this.placeChange.emit(place);
  });
  marker.addListener('click', () => {
    this.seletedMarker.emit(place);
  });

  return this.markers.push(marker);

  }
}
