import { OnChanges } from '@angular/core';
/* eslint-disable require-jsdoc */
import { AngularFireAuth } from 'angularfire2/auth';
import { AuthService } from './../../core/services/auth.service';
import { TipoInstalacion } from 'src/app/core/models/tipo-instalacion.model';
import { SharedPage } from './../../shared/shared.page';
import { Component, OnInit, ViewChild, EventEmitter, Output } from '@angular/core';
import { PlacesService } from 'src/app/core/services/places.service';
import { ModalController } from '@ionic/angular';
import { Place } from '../../core/models/place.model';
import {WasteType} from '../../core/models/waste-type';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import {MarkerCardComponent} from '../marker-card/marker-card.component';
import { FilterMenuComponent } from '../../shared/ui/filter-menu/filter-menu.component';
import { filter } from 'rxjs/operators';


@Component({
  selector: 'app-places-searcher-page',
  templateUrl: './places-searcher-page.page.html',
  styleUrls: ['./places-searcher-page.page.scss'],
})

/**
 * Place Searcher Page is in charge of handling filters,map view and map markers, so that the user
 * interact with them.
 */
export class PlacesSearcherPagePage implements OnInit {
  public isLogged;
  classname = {
    'ly-grid-map': true,
    'ion-no-padding': true
  };
  loadedPlaceType: TipoInstalacion;
  places: Place[];
  position: { lat: number, lng: number};
  placeSelected: Place;
  filters: WasteType[] = [];
  activeFilters: WasteType[] = [];
  modal: any;
  authproof: string ;
  @ViewChild ('mapElement', {static: true}) map;

  @Output() changeView = new EventEmitter();

  // eslint-disable-next-line max-params
  constructor(
    private placesService: PlacesService,
    private geolocationCont: Geolocation,
    public modalController: ModalController,
    private authService: AuthService,
    private afsAuth: AngularFireAuth
  ) { }

  async ngOnInit() {
    this.filters = await  this.placesService.getAllWasteTypes();
    this.activeFilters = this.filters;
    this.places = await this.filterByType(this.activeFilters);
    try {
      const geoPosition = await this.geolocationCont.getCurrentPosition();
      this.position = {
        lat: geoPosition.coords.latitude,
        lng: geoPosition.coords.longitude
      };
      this.map.setCenter(this.position);
    } catch (err) {
    }
  }

  async onViewportChange(bounds) {
    this.places = await this.queryPlaces({lat: bounds.getNorthEast().lat(), lng: bounds.getNorthEast().lng()},
        {lat: bounds.getSouthWest().lat(), lng: bounds.getSouthWest().lng()});
  }


  async queryPlaces(topLeftPos, botRightPos) {
    return this.placesService.searchMapPlaces(topLeftPos, botRightPos);
  }

  async presentFilterModal() {
    this.modal = await this.modalController.create({
      // cahnge component
      component: FilterMenuComponent,
      componentProps: {
        filters: this.filters,
        activeFilters: this.activeFilters,
      },
      backdropDismiss: false

    });
    this.modal.present();
    this.modal.onDidDismiss().then( (event) => {
      this.activeFilters = event.data;
      // eslint-disable-next-line no-console
      console.log('activos', this.activeFilters);

      this.filterByType(event.data).then(places => {
        // eslint-disable-next-line no-console
        console.log(places);
        this.places = places;
      });
    });
    return true;
  }


  emitPlace(place) {
    this.placeSelected = place;
    // eslint-disable-next-line no-console
    console.log(this.placeSelected);
    // get placeType
    if (this.placeSelected.places_type.id) {
      this.placesService.getPlaceTypeByID('' + this.placeSelected.places_type.id).then(placeType => {
        this.loadedPlaceType = placeType;
        // this.presentModal();
      });
    } else {
      this.loadedPlaceType = {
        id: '',
        name: '¡Error! No se pudo cargar, el lugar no está asociado a un tipo de lugar',
        icon_url: ''
      };
    }
  }


  async filterByType(filters: WasteType[]) {
    if (filters.length !== 0) {
      return this.placesService.getIDPlacesTypesByWaste(filters).then(dataplacetype => {
        return this.placesService.getIDPlacesByPlacesType(dataplacetype).then( place => place);
      });
    }

  }

  viewQro() {
    if (this.map) {
      this.map.setCenter({lat: 20.588772, lng: -100.390292});
      // eslint-disable-next-line @typescript-eslint/no-magic-numbers
      this.map.setZoom(12);
      this.placeSelected = null;
      return true;
    }
    return false;
  }

  onMapInteract() {
    // eslint-disable-next-line no-console
    console.log('MAP INTERACT');

  }
}
