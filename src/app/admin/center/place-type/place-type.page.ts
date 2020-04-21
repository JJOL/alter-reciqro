import { Component, OnInit } from '@angular/core';
import { PlacesService } from 'src/app/core/services/places.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController, NavController } from '@ionic/angular';

@Component({
  selector: 'app-place-type',
  templateUrl: './place-type.page.html',
  styleUrls: ['./place-type.page.scss'],
})
export class PlaceTypePage implements OnInit {

  placeTypes: any [];

  constructor(  
    private placesService: PlacesService,
    private alertCtrl: AlertController,
    private navCtrl: NavController,
    private router: Router) {
  }

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.placesService.allPlaceTypes().then( data => { this.placeTypes = data; });
  }

  onDeletePlaceType(placeTypeId: string, name: string) {
    this.alertCtrl.create ({
      header: 'Mensaje de Confirmación',
      message: '¿De verdad quieres eliminar el tipo de residuo "'+name + '"?',
      buttons: [{
        text: 'Cancelar',
        role: 'cancel'
      }, {
        text: 'Borrar',
        handler: () => {
          this.placesService.deletePlaceTypeByID(placeTypeId).then(() => {
            this.placesService.allPlaceTypes().then( data => { this.placeTypes = data; });
          })
              .catch(() => {});
        }
      }]
    }).then(alertEl => {
      alertEl.present();
    });
  }
}
