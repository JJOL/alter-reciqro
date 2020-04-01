import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AlertController, NavController } from '@ionic/angular';

import { LugaresService } from 'src/app/core/services/lugares.service';
import { Place } from 'src/app/core/models/lugar.model';
import { TipoInstalacion } from 'src/app/core/models/tipo-instalacion.model';

@Component({
  selector: 'app-center-detail',
  templateUrl: './center-detail.page.html',
  styleUrls: ['./center-detail.page.scss'],
})

export class CenterDetailPage implements OnInit {
  

  loadedPlace: Place={
    id : "",
    name : "", 
    description : "",
    location: {
      lat: 0,
      lng: 0
  },
    qr_code : "",
    photo : "",
    address : "",
    postal_code : 0,
    places_type : {
      id : "",
      name : "",
      description : ""
    }
  };
  loadedPlaceType: TipoInstalacion;
  constructor (
    private activatedRoute: ActivatedRoute,
    private placeService: LugaresService,
    private alertCtrl: AlertController,
    private navCtrl: NavController
  ) { }
  
  ngOnInit() {
    this.activatedRoute.paramMap.subscribe(paraMap => {
      if (!paraMap.has('centerId')) {
        //redirect
        return;
      }
      const centerId = paraMap.get('centerId');
      if (centerId) {
        this.placeService.getPlaceByID(centerId).then(place => {
          this.loadedPlace = place;

          //get placeType
          if (this.loadedPlace.places_type.id) {
            this.placeService.getPlaceTypeByID(""+this.loadedPlace.places_type.id).then(placeType => {
              this.loadedPlaceType = placeType;
            });
          } else {
            this.loadedPlaceType = {
              id: "",
              name: "¡Error! No se pudo cargar, el lugar no está asociado a un tipo de lugar",
              description: ""
            };
          }
        });
      }
    });
  }

  ionViewWillEnter (){
    
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
            this.navCtrl.navigateBack(['/admin/center/list-centers']);
          })
          .catch(() => {});
        }
      }]
    }).then(alertEl => {
      alertEl.present();
    });
  }

  onChangeMarker(coords){
    console.log(coords);
  }
}
