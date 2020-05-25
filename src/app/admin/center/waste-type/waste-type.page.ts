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
 */
export class WasteTypePage implements OnInit {

  wasteTypes: WasteType[];
  listWasteTypes: WasteType[];
  actualPage = 1;

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
      this.listWasteTypes = this.wasteTypes;
    });
  }

  /**
   * User Story Id: M2NG11, M2NG13
   * Method called when the page is instatiated
   */
  ngOnInit() {
  }

  /**
   * User Story Id: M2NG11, M2NG13
   * Method that gets all the wastes
   */
  ionViewWillEnter() {
    this.wasteService.getWastes().then(data => {
      this.wasteTypes = data;
      this.listWasteTypes = this.wasteTypes;
    });
  }


  /**
   * User Story Id: M2NG13
   * Method that deletes a selected waste, verifying that it is nos associated with any place type, 
   * if true, it can be deleted, else it can't be deleted
   * @param {} wasteTypeId
   * @param {} name
   * @returns 
   */
  onDeleteWateType(wasteTypeId: string, name: string){
    let wastes: any[] = [{
      id: wasteTypeId
    }];
    this.placesService.getIDPlacesTypesByWaste(wastes).then(data => {
      let places: TipoInstalacion[] = data;
      if (places.length > 0) {
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
      } else {
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
                  this.listWasteTypes = this.listWasteTypes.filter( infoBanner => {
                    return infoBanner.id !== wasteTypeId;
                  });
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

  /**
   * User Story ID: M2NG13
   * This function retrieves all waste types that have the name searched
   */
  searchByName(event){
    0 === event.detail.value.length ? this.listWasteTypes = this.wasteTypes:
    this.listWasteTypes = this.wasteTypes.filter( wasteType => {
      return wasteType.name.toLowerCase().indexOf(event.detail.value.toLowerCase()) !== -1;
    })
  }

}
