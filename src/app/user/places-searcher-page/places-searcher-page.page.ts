import { AngularFireAuth } from 'angularfire2/auth';
import { AuthService } from './../../core/services/auth.service';
import { TipoInstalacion } from 'src/app/core/models/tipo-instalacion.model';
import { Component, ViewChild, EventEmitter, Output } from '@angular/core';
import { PlacesService } from 'src/app/core/services/places.service';
import { Place } from '../../core/models/place.model';
import {WasteType} from '../../core/models/waste-type';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { FilterMenuComponent } from '../../shared/ui/filter-menu/filter-menu.component';
import { PopoverController, ModalController } from '@ionic/angular';
import { SplashscreenPage } from '../splashscreen/splashscreen.page';

@Component({
  selector: 'app-places-searcher-page',
  templateUrl: './places-searcher-page.page.html',
  styleUrls: ['./places-searcher-page.page.scss'],
})

/**
 * Place Searcher Page is in charge of handling filters,map view and map markers, so that the user
 * interact with them.
 */
export class PlacesSearcherPagePage  {
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
  modal: HTMLIonPopoverElement;
  authproof: string ;
  @ViewChild ('mapElement', {static: true}) map;

  @Output() changeView = new EventEmitter();

  // eslint-disable-next-line max-params, require-jsdoc
  constructor(
    private placesService: PlacesService,
    private geolocationCont: Geolocation,
    public popoverController: PopoverController,
    private authService: AuthService,
    private afsAuth: AngularFireAuth,
    private modalController: ModalController
  ) { }
  /**
   *  User Story ID: M1NC1
   * Loads the preset filters and places
   */
  async ionViewWillEnter() {
    this.presentModal();
    setTimeout(() => {
      this.modalController.dismiss();
    // eslint-disable-next-line @typescript-eslint/no-magic-numbers
    }, 2000);
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

  ionViewWillLeave() {
    if (this.modal) {
      this.modal.dismiss();
    }
  }

  /**
   * User Story ID:  M1NC2
   * Show the filter menu popover 
   */
  async presentFilterModal() {
    this.modal = await this.popoverController.create({
      component: FilterMenuComponent,
      componentProps: {
        filters: this.filters,
        activeFilters: this.activeFilters,
      },
      backdropDismiss: true

    });
    this.modal.present();
    this.modal.onDidDismiss().then( (event) => {
      console.log(event);
      if (event.data) {
        this.activeFilters = event.data;
        // eslint-disable-next-line no-console
        console.log('activos', this.activeFilters);

        this.filterByType(event.data).then(places => {
          // eslint-disable-next-line no-console
          console.log(places);
          this.places = places;
        });
      }
    });
    return true;
  }


  // eslint-disable-next-line require-jsdoc
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

  /**
   * User Story ID: M1NC2
   * Consumes places services with the filters
   * @param  {WasteType[]} filters
   */
  async filterByType(filters: WasteType[]) {
    if (filters.length !== 0) {
      return this.placesService.getIDPlacesTypesByWaste(filters).then(dataplacetype => {
        return this.placesService.getIDPlacesByPlacesType(dataplacetype).then( place => place);
      });
    }

  }
  /**
   * Sets a Queretaro state viewport 
   */
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
  /**
   */
  close() {
    this.placeSelected = null;
  }

  /**
   * User Story ID: M2NC9
   * Presents the modal Splashscreen
   * @param  
   * @returns 
   */
  async presentModal() {
    const modal = await this.modalController.create({
      component: SplashscreenPage,
      swipeToClose: true,
    });
    return modal.present();
  }
 
}
