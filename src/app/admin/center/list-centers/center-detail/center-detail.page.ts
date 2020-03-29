import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController, NavController } from '@ionic/angular';

import { LugaresService } from 'src/app/core/services/lugares.service';
import { Lugar } from 'src/app/core/models/lugar.model';


@Component({
  selector: 'app-center-detail',
  templateUrl: './center-detail.page.html',
  styleUrls: ['./center-detail.page.scss'],
})
export class CenterDetailPage implements OnInit {

  loadedPlace : Lugar = 
  {
    idlugar : "1",
    nombre : "Basurero Municipal",
    descripcion : "Basurero extremo de separación de desechos",
    longitud : 100.1234,
    latitud : 100.1234,
    codigoQr : "QR",
    foto : "https://i2.wp.com/www2.municipiodequeretaro.gob.mx/wp-content/uploads/2017/05/prensa_1494002771103.jpg?w=1245&ssl=1",
    calle : "Bernardo Quintana",
    ciudad : "Querétaro",
    cp : 76146,
    tipoDeInstalacion : {
      idTipoInstalacion : "1",
      nombre : "Separación de desechos",
      descripcion : "Separación de desechos de cualquier tamaño"
    }
  };

  constructor(
    private activiatedRoute: ActivatedRoute,
    private placeService: LugaresService,
    private router: Router,
    private alertCtrl: AlertController,
    private navCtrl: NavController
    ) { }

  ngOnInit() {
    this.activiatedRoute.paramMap.subscribe(paraMap => {
      if (!paraMap.has('centerId')) {
        //redirect
        return;
      }
      const centerId = paraMap.get('centerId');
      this.loadedPlace = this.placeService.getPlaceByID(centerId);
    });
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
          this.placeService.deletePlaceByID(this.loadedPlace.idlugar);
          this.navCtrl.navigateBack(['/admin/center/list-centers']);
        }
      }]
    }).then(alertEl => {
      alertEl.present();
    });
  }
}
