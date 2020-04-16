import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AlertController, NavController } from '@ionic/angular';

import { PlacesService } from 'src/app/core/services/places.service';
import { Place } from 'src/app/core/models/place.model';
import { TipoInstalacion } from 'src/app/core/models/tipo-instalacion.model';
import { GeoPoint } from 'src/app/core/models/geopoint.model';

@Component({
  selector: 'app-detail-center',
  templateUrl: './detail-center.page.html',
  styleUrls: ['./detail-center.page.scss'],
})

export class CenterDetailPage implements OnInit {

  // loadedPlace: Place={
  //   id : "",
  //   name : "",
  //   description : "",
  //   location: {
  //     lat: 0,
  //     lng: 0
  // },
  //   qr_code : "",
  //   photo : "",
  //   address : "",
  //   postal_code : 0,
  //   places_type : {
  //     id : "",
  //     name : "",
  //     icon_url : ""
  //   }
  // };

  loadedPlace: Place;

  loadedPlaceType: TipoInstalacion;
  mapPlaces: Place[] = [];

  @ViewChild ('mapElement', {static: false}) mapEl;
  constructor(
    private activatedRoute: ActivatedRoute,
    private placeService: PlacesService,
    private alertCtrl: AlertController,
    private navCtrl: NavController
  ) { }

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

          console.log('Place has loaded!');
          console.log(this.mapEl);

          this.mapPlaces = [ this.loadedPlace ];
          // this.mapEl.setCenter(this.loadedPlace.location);


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

  ionViewWillEnter() {

  }

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

  onChangeMarker(coords) {
    console.log(coords);
  }

}
