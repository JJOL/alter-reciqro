import { Component, OnInit, ViewChild, ElementRef, Input } from '@angular/core';
import {Lugar} from 'src/app/core/models/lugar.model';
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

  @Input() lugares: Lugar [] ; 

  constructor( private placeTypeService: LugaresService) { }

  ngOnInit(){
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
    if (this.lugares != null) {
    for ( var lugar of this.lugares){
        let marker: google.maps.Marker = new google.maps.Marker({
          map: this.map,
          position:  new google.maps.LatLng(lugar.latitud, lugar.longitud),
          title: lugar.descripcion,
          draggable: true,
          animation: google.maps.Animation.DROP
        })
    }}
    
  }
}
