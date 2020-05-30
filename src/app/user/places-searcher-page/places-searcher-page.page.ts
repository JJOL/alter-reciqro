import { TipoInstalacion } from 'src/app/core/models/tipo-instalacion.model';
import { Component, ViewChild, EventEmitter, Output } from '@angular/core';
import { Place } from '../../core/models/place.model';
import { WasteType } from '../../core/models/waste-type';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { FilterMenuComponent } from '../../shared/ui/filter-menu/filter-menu.component';
import { PopoverController, ModalController, LoadingController } from '@ionic/angular';
import { SplashscreenPage } from '../splashscreen/splashscreen.page';
import { PlacesSearchService } from 'src/app/core/services/places-search.service';
import { HelpPage } from '../help/help.page';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { PlacesService } from 'src/app/core/services/places.service';

const DEFAULT_CENTER_COORD = { 
  lat: 20.588772, 
  lng: -100.390292
};

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
  mapBounds: any = {};
  placeSelected: Place;
  userLoaction:any;
  lastSearchedPos: { lat: number, lng: number};
  hasMovedAway = false;

  filters: WasteType[] = [];
  activeFilters: WasteType[] = [];
  modal: HTMLIonPopoverElement;
  authproof: string ;



  @ViewChild ('mapElement', {static: true}) map;

  @Output() changeView = new EventEmitter();

  trustedVideoUrl: SafeResourceUrl;
  arrayOfVideos = [{vid_link:'https://www.youtube.com/watch?v=668nUCeBHyY'}]

  // eslint-disable-next-line max-params, require-jsdoc
  constructor(
    private geolocationCont: Geolocation,
    public popoverController: PopoverController,
    private modalController: ModalController,
    private loadingController: LoadingController,
    private searcherService: PlacesSearchService,
    private domSanitizer: DomSanitizer,
    private placeService: PlacesService
  ) { 
  }

  /**
   * User Story ID: M1NC1
   * Description: Retrieve Places based on viewed portion of the screen and activated waste filters.
   */
  async searchPlaces() {
    if (this.activeFilters && this.mapBounds && this.mapBounds.northEast && this.mapBounds.southWest) {
      let controller = await this.loadingController.create({
        spinner: 'crescent'
      });
      controller.present();

      this.searcherService.searchPlaces(this.mapBounds, this.activeFilters)
          .then(results => {
            controller.dismiss();
            this.places = results[0];            
            let zoomLevel = results[1];
            if (zoomLevel > 0) {
              this.map.setZoom(15-zoomLevel);
            }
            let scaleLevel = results[1];

            this.adjustMapZoom(this.places, scaleLevel, this.mapBounds);
          });
      this.lastSearchedPos = this.mapBounds.center;
      this.hasMovedAway = false;
    }
  }


  /**
   * Description: Adjuts map zoom level based on resulting places and viewport
   * @param places 
   * @param scaleLevel 
   * @param mapBounds
   */
  private adjustMapZoom(places: Place[], scaleLevel: number, mapBounds: any): void {
    if (scaleLevel > 0) {
      this.map.setZoom(15-scaleLevel);
    } else {
      let needToZoom = true;
      
      places.forEach(place => {
        let placeIsWithinView = 
          place.location.lat < mapBounds.northEast.lat
          && place.location.lat > mapBounds.southWest.lat
          && place.location.lng < mapBounds.northEast.lng
          && place.location.lng > mapBounds.southWest.lng;
        if (placeIsWithinView) {          
          needToZoom = false;
        }
      })
      if (needToZoom) {
        this.map.setZoom(14); // o 14?
      }
    }
  }
  /**
   *  User Story ID: M1NC1
   * Loads the preset filters and places
   */
  async ionViewWillEnter() {
    for(let i of this.arrayOfVideos){
      this.trustedVideoUrl = this.domSanitizer.bypassSecurityTrustResourceUrl(i.vid_link);
    }
    if(!window.sessionStorage['splash']){
      this.presentModal();
    }
    setTimeout(() => {
      this.modalController.dismiss();
    // eslint-disable-next-line @typescript-eslint/no-magic-numbers
    }, 2000);
    this.filters = await this.searcherService.getAllWasteTypes();
    // this.activeFilters = [];
    this.activeFilters =  this.filters;
    this.searchPlaces();
    // this.places = await this.filterByType(this.activeFilters);
    try {
      const geoPosition = await this.geolocationCont.getCurrentPosition();
      this.position = {
        lat: geoPosition.coords.latitude,
        lng: geoPosition.coords.longitude
      }; 
      this.userLoaction=this.position
    } catch (err) {
      this.position = DEFAULT_CENTER_COORD;
    }
    this.map.setCenter(this.position);
  }

  /**
   * User Story ID: M1NCx
   * Function that gets called when it entered succesfully
   */
  ionViewDidEnter(){
    this.placeService.persist();
  }
 
  /**
   * User Story ID: M1NC1, M1NC2 y M1NC4
   * Close modal when it will leave the page
   */
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
      if (event.data) {
        this.activeFilters = event.data;
        this.searchPlaces();
      }
    });
    return true;
  }


  /**
   * User Story ID: M1NC1, M1NC2 y M1NC4
   * Emit place when filter changes
   * @param  {} place
   */
  emitPlace(place) {
    this.placeSelected = place;
    // eslint-disable-next-line no-console
    console.log(this.placeSelected);
    // get placeType
    if (this.placeSelected.places_type.id) {
      this.loadedPlaceType =  this.searcherService.getPlaceTypeById(this.placeSelected.places_type.id);
    } else {
      this.loadedPlaceType = {
        id: '',
        name: '¡Error! No se pudo cargar, el lugar no está asociado a un tipo de lugar',
        icon_url: ''
      };
    }
  }

  
  /**
   * User Story ID: M1NC1
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
   * User Story ID: M1NC4
   * Close when cross is pressed
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

  /**
   * User Story ID: M1NC1
   * Presents the modal of help
   * @param  
   * @returns 
   */
  async presentHelpModal() {
    const modal = await this.modalController.create({
      component: HelpPage,
      swipeToClose: true,
    });
    return modal.present();
  }

  /**
   * User Story ID: M1NC1, M1NC2 y M1NC4
   * Description: Callback to update view mapBounds
   * @param  {} mapBounds
   */
  onMapCenterChange(mapBounds) {
    this.mapBounds = mapBounds;
    
    if(this.mapBounds.center && this.lastSearchedPos) {
      let dist = this.dist(this.mapBounds.center, this.lastSearchedPos);
      // eslint-disable-next-line @typescript-eslint/no-magic-numbers
      if (dist > 0.005) {
        this.hasMovedAway = true;
      }
    }
    
  }
  /**
   * @param  {{lat:number} p1
   * @param  {number}} lng
   * @param  {{lat:number} p2
   * @param  {number}} lng
   * User Story ID: M1NC1, M1NC2 
   */
  private dist(p1: {lat:number, lng:number}, p2: {lat:number, lng:number}): number {
    return Math.sqrt(Math.pow((p1.lat-p2.lat),2) + Math.pow((p1.lng-p2.lng),2))
  }

  /**
   * User Story ID: M1NC1
   * Description: Handle for manually searching button
   */
  onSearchHereClick() {
    this.searchPlaces();
  }
  /**
   * User Story ID: M1NC1, M1NC2 y M1NC4
   * Triggered when the user location is clicked
   */
  async onUserLocationClick(){
    try {
      const geoPosition = await this.geolocationCont.getCurrentPosition();
      this.position = {
        lat: geoPosition.coords.latitude,
        lng: geoPosition.coords.longitude
      }; 
      this.userLoaction=this.position
    } catch (err) {
      this.position = DEFAULT_CENTER_COORD;
    }    
    this.map.setCenter(this.position);
  }

  /**
   * Triggered when the help button is clicked
   */
  onHelpClick(){
    this.presentHelpModal();
  }
  
}
