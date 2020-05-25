import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AlertController, NavController } from '@ionic/angular';
import { PlacesService } from 'src/app/core/services/places.service';
import { Place } from 'src/app/core/models/place.model';
import { TipoInstalacion } from 'src/app/core/models/tipo-instalacion.model';


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
   * Constructor for the class.
   */
  // eslint-disable-next-line max-params, require-jsdoc
  constructor(
    private activatedRoute: ActivatedRoute,
    private placeService: PlacesService,
    private alertCtrl: AlertController,
    private navCtrl: NavController
  ) { }

  /**
   * User Story ID: M1NG5
   * Loads the current center
   * Whenever the pages gets called, it loads the detail of the place.
   */
  ngOnInit() {
    this.activatedRoute.paramMap.subscribe(paraMap => {

      if (!paraMap.has('centerId')) {
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
   * Renders the QR Image associated to the Place.
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
  }

  /**
   * User Story ID: M1NG3
   * Warns the user before deleting a place with an alert
   */
  onDeletePlace() {
    this.alertCtrl.create ({
      header: '¿Estas seguro?',
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
