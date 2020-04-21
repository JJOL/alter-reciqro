import { Component, OnInit } from '@angular/core';
import { AlertController, NavController } from '@ionic/angular';
import { PlacesService } from 'src/app/core/services/places.service';

@Component({
  selector: 'app-add-place-type',
  templateUrl: './add-place-type.page.html',
  styleUrls: ['./add-place-type.page.scss'],
})
export class AddPlaceTypePage implements OnInit {

  name_waste_type: string;
  url_waste_type: string;

  constructor(
    private placeService: PlacesService,
    private navCtrl: NavController,
    private alertCtrl: AlertController
  ) { }

  ngOnInit() {
  }

  addPlaceType(){
    this.placeService.addPlaceTypeFB(this.name_waste_type, this.url_waste_type).then(() => {
      this.alertCtrl.create ({
        header: 'Mensaje de Confirmación',
        message: 'El tipo de lugar de residuo "' + this.name_waste_type + '" se ha registrado correctamente',
        buttons: [{
          text: 'Aceptar',
          role: 'accept'
        }]
      }).then(alertEl => {
        alertEl.present();
      });
      this.navCtrl.navigateBack(['/admin/center/place-type']);
    })
        .catch(() => {});
  }

}
