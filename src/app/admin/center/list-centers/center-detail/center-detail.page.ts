import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController, NavController } from '@ionic/angular';

import { LugaresService } from 'src/app/core/services/lugares.service';
import { Place } from 'src/app/core/models/lugar.model';
import { Observable } from 'rxjs';

import { NgIf } from '@angular/common';


@Component({
  selector: 'app-center-detail',
  templateUrl: './center-detail.page.html',
  styleUrls: ['./center-detail.page.scss'],
})
export class CenterDetailPage implements OnInit {
  


  loadedPlace: Place;

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
      if (centerId) {
        this.placeService.getPlaceByID(centerId).then(place => {
          this.loadedPlace = place;
          console.log(this.loadedPlace.places_type);
          console.dir(this.loadedPlace.places_type);
          console.log(this.loadedPlace.location);
          
        });
      }
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
          this.placeService.deletePlaceByID(this.loadedPlace.id);
          this.navCtrl.navigateBack(['/admin/center/list-centers']);
        }
      }]
    }).then(alertEl => {
      alertEl.present();
    });
  }

  onChangeMarker(coords){
    console.log(coords);
  }
  
  /*
    this.placeService.deletePlaceByID(this.loadedPlace.id).then(() => {
      this.navCtrl.navigateBack(['/admin/center/list-centers']);
      //this.showToast('Idea deleted');
    }, err => {
      //this.showToast('There was a problem deleting your idea :(');
    });

  }*/
}
