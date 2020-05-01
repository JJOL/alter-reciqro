import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { WasteService } from 'src/app/core/services/waste.service';
import { WasteType } from 'src/app/core/models/waste-type';
import { NavController, AlertController } from '@ionic/angular';

@Component({
  selector: 'app-update-waste-type',
  templateUrl: './update-waste-type.page.html',
  styleUrls: ['./update-waste-type.page.scss'],
})
export class UpdateWasteTypePage implements OnInit {

  loadedWasteType: WasteType;
  nameWasteType: string;
  urlWasteType: string;
  descriptionWasteType: string;
  wasteId: string;


  constructor(
    private activatedRoute: ActivatedRoute,
    private wasteService: WasteService,
    private navCtrl: NavController,
    private alertCtrl: AlertController
  ) { }

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe(paraMap => {
      if (!paraMap.has('wasteId')) {
        return;
      }
      const wasteId = paraMap.get('wasteId');
      if (wasteId) {
        this.wasteId = wasteId;
        this.wasteService.getWasteById(wasteId).then(waste => {
          this.loadedWasteType = waste;
          this.nameWasteType = this.loadedWasteType.name;
          this.urlWasteType = this.loadedWasteType.icon;
          this.descriptionWasteType = this.loadedWasteType.description;
        });
      }
    });
  }

  updateWasteType(){
    this.wasteService.updateWasteType(this.wasteId, this.nameWasteType, this.urlWasteType, this.descriptionWasteType).then(() => {
      this.alertCtrl.create ({
        header: 'Mensaje de Confirmación',
        message: 'El tipo de residuo "' + this.nameWasteType + '" se ha modificado',
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

  cancelUpdate(){
    this.alertCtrl.create ({
      header: 'Mensaje de Confirmación',
      message: 'Los cambios generados no se guardarán.',
      buttons: [{
        text: 'Aceptar',
        handler: () => {
          this.navCtrl.navigateBack(['/admin/center/waste-type']);
        }
      },{
        text: 'Cancelar',
        role: 'cancel'
      }]
    }).then(alertEl => {
      alertEl.present();
    });
  }

}
