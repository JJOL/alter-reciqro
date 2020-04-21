import { Component, OnInit } from '@angular/core';
import { TipoInstalacion } from 'src/app/core/models/tipo-instalacion.model';
import { PlacesService } from 'src/app/core/services/places.service';
import { ActivatedRoute } from '@angular/router';
import { NavController, AlertController } from '@ionic/angular';

@Component({
  selector: 'app-update-place-type',
  templateUrl: './update-place-type.page.html',
  styleUrls: ['./update-place-type.page.scss'],
})
export class UpdatePlaceTypePage implements OnInit {

  loadedPlaceType: TipoInstalacion;
  name_waste_type: string;
  url_waste_type: string;


  constructor(
    private activatedRoute: ActivatedRoute,
    private placeService: PlacesService,
    private navCtrl: NavController,
    private alertCtrl: AlertController
  ) { }

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe(paraMap => {
      if (!paraMap.has('updatePlaceTypeId')) {
        return;
      }
      const wasteId = paraMap.get('updatePlaceTypeId');
      if (wasteId) {
        this.placeService.getPlaceTypeByID(wasteId).then(waste => {
          this.loadedPlaceType = waste;
          this.name_waste_type = this.loadedPlaceType.name;
          this.url_waste_type = this. loadedPlaceType.icon_url;
        });
      }
    });
  }

  updatePlaceType(){
    this.placeService.updatePlaceType(this.loadedPlaceType.id, this.name_waste_type, this.url_waste_type).then(() => {
      this.alertCtrl.create ({
        header: 'Mensaje de Confirmación',
        message: 'El tipo de lugar de residuo "' + this.name_waste_type + '" se ha modificado',
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
