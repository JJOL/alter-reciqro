import { TipoInstalacion } from 'src/app/core/models/tipo-instalacion.model';
import { Component, ViewChild, EventEmitter, Output } from '@angular/core';
import { Place } from '../../core/models/place.model';
import {WasteType} from '../../core/models/waste-type';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { FilterMenuComponent } from '../../shared/ui/filter-menu/filter-menu.component';
import { PopoverController, ModalController } from '@ionic/angular';
import { SplashscreenPage } from '../splashscreen/splashscreen.page';
import { PlacesSearchService } from 'src/app/core/services/places-search.service';
import { HelpPage } from '../help/help.page';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

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
  hasMovedAway: boolean = false;

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
    private searcherService: PlacesSearchService,
    private domSanitizer: DomSanitizer 
  ) { }

  /**
   * Description: Retrieve Places based on viewed portion of the screen and activated waste filters.
   */
  searchPlaces() {
    if (this.activeFilters && this.mapBounds && this.mapBounds.northEast && this.mapBounds.southWest) {
      this.searcherService.searchPlaces(this.mapBounds, this.activeFilters)
      .then(places => {
        this.places = places;
      });

      this.lastSearchedPos = this.mapBounds.center;
      this.hasMovedAway = false;
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
    this.presentModal();
    setTimeout(() => {
      this.modalController.dismiss();
    // eslint-disable-next-line @typescript-eslint/no-magic-numbers
    }, 2000);
    this.filters = await this.searcherService.getAllWasteTypes();
    this.activeFilters = [];
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
      console.log("Try catch")
    }    
    console.log(this.position)
    this.map.setCenter(this.position);

    
    
  }
  /**
   */
  // async ngOnChanges(){
  //   try {
  //     const geoPosition = await this.geolocationCont.getCurrentPosition();
  //     this.position = {
  //       lat: geoPosition.coords.latitude,
  //       lng: geoPosition.coords.longitude
  //     }; 
  //     this.userLoaction=this.position
  //   } catch (err) {
  //     this.position = DEFAULT_CENTER_COORD;
  //   }    
  //   this.map.setCenter(this.position);
  // }

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


  // eslint-disable-next-line require-jsdoc
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

  /** @deprecated Replaced by searchPlaces()
   * User Story ID: M1NC2
   * Consumes places services with the filters
   * @param  {WasteType[]} filters
   */
  // async filterByType(filters: WasteType[]) {
  //   if (filters.length !== 0) {
  //     return this.placesService.getIDPlacesTypesByWaste(filters).then(dataplacetype => {
  //       return this.placesService.getIDPlacesByPlacesType(dataplacetype).then( place => place);
  //     });
  //   }

  // }
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
   * Description: Callback to update view mapBounds
   * @param  {} mapBounds
   */
  onMapCenterChange(mapBounds) {
    console.log(mapBounds);
    this.mapBounds = mapBounds;
    
    if(this.mapBounds.center && this.lastSearchedPos) {
      let dist = this.dist(this.mapBounds.center, this.lastSearchedPos);
      console.log(dist);
      if (dist > 0.005) {
        this.hasMovedAway = true;
      }
    }
    
  }
  private dist(p1: {lat:number, lng:number}, p2: {lat:number, lng:number}): number {
    return Math.sqrt(Math.pow((p1.lat-p2.lat),2) + Math.pow((p1.lng-p2.lng),2))
  }

  /**
   * Description: Handle for manually searching button
   */
  onSearchHereClick() {
    this.searchPlaces();
  }
  /**
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
