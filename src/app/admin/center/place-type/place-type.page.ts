import { Component, OnInit } from '@angular/core';
import { PlacesService } from 'src/app/core/services/places.service';
import { ActivatedRoute } from '@angular/router';
import { AlertController, NavController } from '@ionic/angular';

@Component({
  selector: 'app-place-type',
  templateUrl: './place-type.page.html',
  styleUrls: ['./place-type.page.scss'],
})
export class PlaceTypePage implements OnInit {

  placeTypes: any [];

  constructor(  
    private activatedRoute: ActivatedRoute,
    private placesService: PlacesService,
    private alertCtrl: AlertController,
    private navCtrl: NavController) {
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
            this.navCtrl.navigateBack(['/admin/center/place-type']);
          })
              .catch(() => {});
        }
      }]
    }).then(alertEl => {
      alertEl.present();
    });
  }
}
