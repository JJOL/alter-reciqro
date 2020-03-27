import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

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
    console.log(this.mapElement);
  }

  initMap(){ 
    let coords = new google.maps.LatLng(45,100);
    let mapOptions: google.maps.MapOptions = {
      center: coords,
      zoom: 14,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    }

    this.map = new google.maps.Map(this.mapElement.nativeElement, 
      mapOptions)
  }
  
}
