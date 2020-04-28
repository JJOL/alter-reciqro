import { Component, OnInit } from '@angular/core';
import { WasteType } from 'src/app/core/models/waste-type';
import { WasteService } from 'src/app/core/services/waste.service';
import { PlacesService } from 'src/app/core/services/places.service';
import { TipoInstalacion } from 'src/app/core/models/tipo-instalacion.model';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-waste-type',
  templateUrl: './waste-type.page.html',
  styleUrls: ['./waste-type.page.scss'],
})
export class WasteTypePage implements OnInit {

  wasteTypes: WasteType[];

  constructor(
    private wasteService: WasteService,
    private placesService: PlacesService,
    private alertCtrl: AlertController
    ) {
    this.wasteService.getWastes().then(data => {
      this.wasteTypes = data;
    });
   }

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.wasteService.getWastes().then(data => {
      this.wasteTypes = data;
    });
  }


  onDeleteWateType(wasteTypeId: string, name: string){
    let wastes: any[] = [{
      id: wasteTypeId
    }];
    this.placesService.getIDPlacesTypesByWaste(wastes).then(data => {
      let places: TipoInstalacion[] = data;
      // eslint-disable-next-line @typescript-eslint/no-magic-numbers
      if(places.length > 0){
        this.alertCtrl.create ({
          header: 'Atención',
          message: 'No es posible eliminar el tipo de desecho "' + name + '" ya que está asociada a diversas categorías de centros.',
          buttons: [{
            text: 'Aceptar',
            role: 'cancel'
          }]
        }).then(alertEl => {
          alertEl.present();
        });
      }else{
        this.alertCtrl.create ({
          header: 'Mensaje de Confirmación',
          message: '¿De verdad quieres eliminar el tipo de residuo "'+ name + '"?',
          buttons: [{
            text: 'Cancelar',
            role: 'cancel'
          }, {
            text: 'Borrar',
            handler: () => {
              this.wasteService.deleteWasteTypeByID(wasteTypeId).then(() => {
                this.wasteService.getWastes().then( data => { 
                  this.wasteTypes = data; 
                });
              })
                  .catch(() => {});
            }
          }]
        }).then(alertEl => {
          alertEl.present();
        });
      }
    }); 
    
  }

}
