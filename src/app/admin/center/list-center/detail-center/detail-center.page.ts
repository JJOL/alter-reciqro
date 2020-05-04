/* eslint-disable require-jsdoc */
import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AlertController, NavController } from '@ionic/angular';

import { PlacesService } from 'src/app/core/services/places.service';
import { Place } from 'src/app/core/models/place.model';
import { TipoInstalacion } from 'src/app/core/models/tipo-instalacion.model';

//import { GeoPoint } from 'src/app/core/models/geopoint.model';

declare const QRCode: any;
const QR_RENDER_DELAY = 1000;

@Component({
  selector: 'app-detail-center',
  templateUrl: './detail-center.page.html',
  styleUrls: ['./detail-center.page.scss'],
})

/**
 * User Story ID: M1NG5
 * CenterDetailPage class.
 */
export class CenterDetailPage implements OnInit {

  loadedPlace: Place;
  position: { lat: number, lng: number};

  loadedPlaceType: TipoInstalacion;
  mapPlaces: Place[] = [];

  @ViewChild ('mapElement', {static: false}) map;
  @ViewChild ('qrCodeElement', { static: false }) qrCodeEl;


  /**
   * User Story ID: M1NG5
   * 
   */
  // eslint-disable-next-line max-params
  constructor(
    private activatedRoute: ActivatedRoute,
    private placeService: PlacesService,
    private alertCtrl: AlertController,
    private navCtrl: NavController
  ) { }

  /**
   * User Story ID: M1NG5
   */
  ngOnInit() {
    this.activatedRoute.paramMap.subscribe(paraMap => {

      if (!paraMap.has('centerId')) {
        // redirect
        return;
      }

      const centerId = paraMap.get('centerId');
      
      if (centerId) {
        this.placeService.getPlaceByID(centerId).then(place => {

          this.loadedPlace = place;
          this.mapPlaces = [ this.loadedPlace ];

          this.position = {
            lat: place.location.lat,
            lng: place.location.lng
          };
          this.map.setCenter(this.position);

          this.renderQRImage();
          

          // get placeType
          if (this.loadedPlace.places_type.id) {
            this.placeService.getPlaceTypeByID('' + this.loadedPlace.places_type.id).then(placeType => {
              this.loadedPlaceType = placeType;
            });
          } else {
            this.loadedPlaceType = {
              id: '',
              name: '¡Error! No se pudo cargar, el lugar no está asociado a un tipo de lugar',
              icon_url: ''
            };
          }
        });
      }
    });
  }
  /**
   * User Story ID: M1NG6
   * Description: Renders the QR Image associated to the Place
   */
  renderQRImage() {
    let data = this.loadedPlace.id;

    if (!this.qrCodeEl) {
      setTimeout(() => this.renderQRImage(), QR_RENDER_DELAY);
      return;
    }

    new QRCode(this.qrCodeEl.nativeElement, {
      text: data,
      width: 128,
      height: 128
    });
    // With promises
    // QRCode.toDataURL('I am a pony!')
    // .then(url => {
    //   console.log(url)
    // })
    // .catch(err => {
    //   console.error(err)
    // });
  }

  /**
   * User Story ID: M1NG5
   */
  ionViewWillEnter() {
    
  }
  
  /**
   * User Story ID: M1NG3
   * Description: This function warns the user before deleting a place with an alert
   */
  onDeletePlace() {
    this.alertCtrl.create ({
      header: '¿Estas segur@?',
      message: '¿De verdad quieres eliminar este lugar?',
      buttons: [{
        text: 'Cancelar',
        role: 'cancel'
      }, {
        text: 'Borrar',
        handler: () => {
          this.placeService.deletePlaceByID(this.loadedPlace.id).then(() => {
            this.navCtrl.navigateBack(['/admin/center/list-center']);
          })
              .catch(() => {});
        }
      }]
    }).then(alertEl => {
      alertEl.present();
    });
  }

}
