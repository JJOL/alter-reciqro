import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController, NavController } from '@ionic/angular';

import { LugaresService } from 'src/app/core/services/lugares.service';
import { Lugar } from 'src/app/core/models/lugar.model';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-center-detail',
  templateUrl: './center-detail.page.html',
  styleUrls: ['./center-detail.page.scss'],
})
export class CenterDetailPage implements OnInit {
  
  loadedPlace: Lugar = {
    id : '',
    name : '', 
    description : '',
    //longitud : number
    //latitud : number
    location: [],
    qrCode : '',
    urlPhoto : '',
    street : '',
    delegation : '',
    zipCode : 0,
    centreType : {
      idTipoInstalacion : "",
      nombre : "",
      descripcion : ""
    },
  };
  /*
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
  };*/

  constructor(
    private activatedRoute: ActivatedRoute,
    private placeService: LugaresService,
    private router: Router,
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
      console.log("HOLA"+centerId);
      if (centerId) {
        this.placeService.getPlaceByID(centerId).subscribe(place => {
          this.loadedPlace = place;
        });
      }
    });
  }

  onDeletePlace() {
    this.placeService.deletePlaceByID(this.loadedPlace.id).then(() => {
      this.navCtrl.navigateBack(['/admin/center/list-centers']);
      //this.showToast('Idea deleted');
    }, err => {
      //this.showToast('There was a problem deleting your idea :(');
    });
  }
  
  /*
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
          this.placeService.deletePlaceByID(this.loadedPlace.id);
          this.navCtrl.navigateBack(['/admin/center/list-centers']);
        }
      }]
    }).then(alertEl => {
      alertEl.present();
    });
  }*/
}
