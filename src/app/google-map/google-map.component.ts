import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
declare const google: any;

@Component({
  selector: 'app-google-map',
  templateUrl: './google-map.component.html',
  styleUrls: ['./google-map.component.scss'],
})
export class GoogleMapComponent implements OnInit {

  @ViewChild('map', { static: true }) mapElement;
  map: any;

  constructor() { }

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
    console.log(this.map);

    let marker: google.maps.Marker = new google.maps.Marker({
      map: this.map,
      position: coords,
      title: 'Hello World!',
      draggable: true,
      animation: google.maps.Animation.DROP
    })
  }
}
