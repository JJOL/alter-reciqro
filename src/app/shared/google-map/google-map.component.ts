import { Component, OnInit, OnChanges , ViewChild, Input, Output, EventEmitter } from '@angular/core';
import {Place} from 'src/app/core/models/place.model';
import { PlacesService } from 'src/app/core/services/places.service';
declare const google: any;


const DEFAULT_CENTER_COORD = new google.maps.LatLng(20.588772, -100.390292);
@Component({
  selector: 'app-shared-google-map',
  templateUrl: './google-map.component.html',
  styleUrls: ['./google-map.component.scss'],
})
/**
 * User Story ID:  M1NC1
 * Map component, depends on async loading of Google Maps SDK
 */
export class GoogleMapComponent implements OnInit, OnChanges {
  @ViewChild('map', { static: true }) mapElement;
  map: google.maps.Map;

  @Input() places: Place[] = [] ;
  @Input() editable: boolean;
  @Input() max: number;
  @Input() center: any  = {
    lat: 20.610381,
    lng: -100.382063
  };
  currentInfoWindow: any ;
  markers: any[] = [];
  @Output() placeChange = new EventEmitter();
  // eslint-disable-next-line @angular-eslint/no-output-native
  @Output() change = new EventEmitter();
  @Output() seletedMarker = new EventEmitter<Place>();
  toloaded = true;
  // eslint-disable-next-line require-jsdoc
  constructor(private placesServices: PlacesService) { }


  /**
   * User Story ID:  M1NC1
   * Check for limits for markers  array and init the map
   */
  ngOnInit() {
    this.max =  null === this.max ? Number.MAX_SAFE_INTEGER : this.max;
    this.initMap();
  }
  /**
   * User Story ID:  M1NC1
   * Initial checks and cleanup of previous markers
   */
  ngOnChanges() {
    if (this.center && this.toloaded && this) {
      this.toloaded = false;
    }
    for (const marker of this.markers) {
      marker.setMap(null);
    }
    this.markers = [];



    if (this.places) {
      const max =  this.max < this.places.length ? this.max : this.places.length;
      this.places = this.places.slice(0, max);
      for ( const place of this.places) {
        this.addMarker(place);
      }}
  }
  /**
   * User Story ID:  M1NC1
   * It inits the map with the default config and load the preset places
   */
  initMap() {

    const mapOptions: google.maps.MapOptions = {
      center: DEFAULT_CENTER_COORD,
      zoom: 15,
      mapTypeId: google.maps.MapTypeId.ROADMAP,
      disableDefaultUI: true
    };

    this.map = new google.maps.Map(this.mapElement.nativeElement,
        mapOptions);

    google.maps.event.addListener(this.map, 'idle', () => {
      this.change.emit(this.map.getBounds());
    } );

    if (this.editable) {

      google.maps.event.addListener(this.map, 'click', event => {
        const place = {
          location: {
            lat: event.latLng.lat(),
            lng: event.latLng.lng()}
        };
        if (this.addPlace(place)) {
          this.placeChange.emit(place);
          this.addMarker(place);

        }
      });
    }



  }


  /**
   * US ID: M1NC1
   * Add a place and return the current size of the array holding the places
   * @param  {} place
   * @returns number
   */
  addPlace(place) {
    if (this.places.length < this.max) {
      return this.places.push(place);
    }
    return false;
  }
  /**
   * User Story ID: 
   * Centers the map
   * @param  {} coord
   */
  setCenter(coord) {
    return this.map.setCenter(coord);
  }
  
  /**
   * Changes map zoom
   * @param  {} zoom
   */
  setZoom(zoom) {
    this.map.setZoom(zoom);
  }
  
  /**
   * User Story ID:  M1NC1, M1NC2, M1NC4,M1NC5
   * Adds a marker to the map, also adds an info windows with external link to Google Maps if the place has complete Place Type
   * @param  {} place
   */
  async addMarker(place) {
    var contentString = 
    '<h1 id="firstHeading" class="firstHeading">'+place.name+'</h1>'+
    '<p>'+place.description+'</p>'+
       '<ion-button  class="ion-no-padding" fill="outline" ><a target="_blank" href="https://www.google.com/maps/dir//'+place.location.lat+','+place.location.lng+'/@'+place.location.lat+','+place.location.lng+',17z">Ir al lugar</a></ion-button>';
    var infowindow = new google.maps.InfoWindow({
      content: contentString
    });
    let icon;
    if(null!=place.places_type)
    { icon = await this.placesServices.getPlaceTypeByID(place.places_type.id)}
    const marker: google.maps.Marker = new google.maps.Marker({
      map: this.map,
      position:  new google.maps.LatLng(place.location.lat, place.location.lng),
      icon: icon? icon.icon_url:'http://maps.google.com/mapfiles/ms/icons/red-dot.png',
      draggable: this.editable ? true : false,
      // animation: google.maps.Animation.DROP
    });

    marker.addListener('dragend', event => {
      const place = {
        location: {
          lat: event.latLng.lat(),
          lng: event.latLng.lng()}
      };
      this.placeChange.emit(place);
    });
    marker.addListener('click', () => {
      //this.seletedMarker.emit(place);
      if(this.currentInfoWindow!=null) this.currentInfoWindow.close();
      this.currentInfoWindow = infowindow;
      this.currentInfoWindow.open(this.map, marker);

    });

    return this.markers.push(marker);

  }
}
