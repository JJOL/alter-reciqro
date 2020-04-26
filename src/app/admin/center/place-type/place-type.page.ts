import { Component, OnInit } from '@angular/core';
import { PlacesService } from 'src/app/core/services/places.service';
import { AlertController } from '@ionic/angular';
import { PlacesWasteTypes } from 'src/app/core/models/waste-type';

@Component({
  selector: 'app-place-type',
  templateUrl: './place-type.page.html',
  styleUrls: ['./place-type.page.scss'],
})

/**
   * User Story Id: M1NG8, M1NG10
   * Allows the Place Type Page to be available for imports
   * @param  
   * @returns 
   */
export class PlaceTypePage implements OnInit {

  placeTypes: any [];
  placeWasteTypeToDelete: PlacesWasteTypes[];

  /**
   * User Story Id: M1NG8, M1NG10
   * Allows to inject services to the model for alerts and PlacesService
   * @param  {ActivatedRoute} activatedRoute
   * @param  {AlertController} alertCtrl
   * @returns 
   */
  constructor(  
    private placesService: PlacesService,
    private alertCtrl: AlertController) {
  }

  /**
   * User Story Id: M1NG8, M1NG10
   * Fuction that is executed when the page instantiated
   * @param  
   * @returns 
   */
  ngOnInit() {
  }

  /**
   * User Story Id: M1NG8
   * Fuction that is executed when the page shown that loads all the place types avalable using the PlacesService service
   * @param  
   * @returns 
   */
  ionViewWillEnter() {
    this.placesService.allPlaceTypes().then( data => { this.placeTypes = data; });
  }

  /**
   * User Story Id: M1NG10
   * Method that calles the deletePlaceTypeByID method form the service PlacesService to delete an existing Place Type and its relations to the waste types
   * @param 
   * @returns 
   */
  onDeletePlaceType(placeTypeId: string, name: string) {
    this.alertCtrl.create ({
      header: 'Mensaje de Confirmación',
      message: '¿De verdad quieres eliminar el tipo de residuo "'+name + '"?',
      buttons: [{
        text: 'Cancelar',
        role: 'cancel'
      }, {
        text: 'Borrar',
        handler: () => {
          this.placesService.deletePlaceTypeByID(placeTypeId).then(() => {
            this.placesService.getAllWasteTypeByPlaceType(placeTypeId).then(data => {
              this.placeWasteTypeToDelete = data;
              for (const item of this.placeWasteTypeToDelete){
                this.placesService.deletePlaceWasteType(item.id);
              }
            });
            this.placesService.allPlaceTypes().then( data => { this.placeTypes = data; });
          })
              .catch(() => {});
        }
      }]
    }).then(alertEl => {
      alertEl.present();
    });
  }
}
