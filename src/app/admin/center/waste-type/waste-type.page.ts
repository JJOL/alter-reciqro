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

/**
   * User Story Id: M2NG11, M2NG13
   * Allows the WasteTypePage available for imports
   * @param  
   * @returns 
   */
export class WasteTypePage implements OnInit {

  wasteTypes: WasteType[];

   /**
   * User Story Id: M2NG11, M2NG13
   * Construtor of the class that uses the Placeservice, WasteService and AlertController
   * @param  {PlacesService} placesService
   * @param  {WasteService} wasteService
   * @param  {AlertController} alertCtrl
   * @returns 
   */
  constructor(
    private wasteService: WasteService,
    private placesService: PlacesService,
    private alertCtrl: AlertController
    ) {
    this.wasteService.getWastes().then(data => {
      this.wasteTypes = data;
    });
   }

  /**
   * User Story Id: M2NG11, M2NG13
   * Method called when the page is instatiated
   * @param  
   * @returns 
   */
  ngOnInit() {
  }

   /**
   * User Story Id: M2NG11, M2NG13
   * Method that gets all the wastes
   * @param  
   * @returns 
   */
  ionViewWillEnter() {
    this.wasteService.getWastes().then(data => {
      this.wasteTypes = data;
    });
  }


  /**
   * User Story Id: M2NG13
   * Method that deletes a selected waste, verifying that it is nos associated with any place type, if true, it can be deleted, else it can't be deleted
   * @param  
   * @returns 
   */
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
