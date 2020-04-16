import { Component, OnInit } from '@angular/core';
import { TipoInstalacion } from 'src/app/core/models/tipo-instalacion.model';
import { PlacesService } from 'src/app/core/services/places.service';
import { ActivatedRoute } from '@angular/router';
import { AlertController, NavController } from '@ionic/angular';

@Component({
  selector: 'app-detail-place-type',
  templateUrl: './detail-place-type.page.html',
  styleUrls: ['./detail-place-type.page.scss'],
})
export class DetailPlaceTypePage implements OnInit {

  loadedPlaceType: TipoInstalacion;

  constructor(
    private activatedRoute: ActivatedRoute,
    private placeService: PlacesService,
    private alertCtrl: AlertController,
    private navCtrl: NavController
  ) { }

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe(paraMap => {
      if (!paraMap.has('wasteId')) {
        // redirect
        return;
      }
      const wasteId = paraMap.get('wasteId');
      if (wasteId) {
        this.placeService.getPlaceTypeByID(wasteId).then(waste => {
          this.loadedPlaceType = waste;
          console.log(this.loadedPlaceType);
        });
      }
    });
  }

  onDeletePlaceType() {
    this.alertCtrl.create ({
      header: '¿Estas segur@?',
      message: '¿De verdad quieres eliminar este tipo de lugar?',
      buttons: [{
        text: 'Cancelar',
        role: 'cancel'
      }, {
        text: 'Borrar',
        handler: () => {
          this.placeService.deletePlaceTypeByID(this.loadedPlaceType.id).then(() => {
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
