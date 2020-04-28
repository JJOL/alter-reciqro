import { Component, OnInit } from '@angular/core';
import { NavController, AlertController } from '@ionic/angular';
import { WasteService } from 'src/app/core/services/waste.service';

@Component({
  selector: 'app-add-waste-type',
  templateUrl: './add-waste-type.page.html',
  styleUrls: ['./add-waste-type.page.scss'],
})
export class AddWasteTypePage implements OnInit {

  nameWasteType: string;
  descriptionWasteType: string;
  urlWasteType: string;

  constructor(
    private wasteService: WasteService,
    private navCtrl: NavController,
    private alertCtrl: AlertController
    ) { }

  ngOnInit() {
  }

  addWasteType(){
    this.wasteService.addWasteType(this.nameWasteType, this.urlWasteType, this.descriptionWasteType).then(() => {
      this.alertCtrl.create ({
        header: 'Mensaje de Confirmación',
        message: 'El tipo de residuo "' + this.nameWasteType + '" se ha registrado correctamente',
        buttons: [{
          text: 'Aceptar',
          role: 'accept'
        }]
      }).then(alertEl => {
        alertEl.present();
      });
      this.navCtrl.navigateBack(['/admin/center/waste-type']);
    })
        .catch(() => {});
  }
}
