/* eslint-disable max-params */
import { Component, OnInit } from '@angular/core';
import { AlertController, NavController } from '@ionic/angular';
import { PlacesService } from 'src/app/core/services/places.service';
import { WasteService } from 'src/app/core/services/waste.service';
import { WasteType } from 'src/app/core/models/waste-type';

@Component({
  selector: 'app-add-place-type',
  templateUrl: './add-place-type.page.html',
  styleUrls: ['./add-place-type.page.scss'],
})

/**
   * User Story Id: M1NG9
   * Allows the Add Place Type Page to be available for imports
   * @param  
   * @returns 
   */
export class AddPlaceTypePage implements OnInit {

  //Class variable to store al waste types
  wasteTypes: WasteType[];

  //Class variable to store the checked wastes
  checkedWasteTypes = [];

  // Class variable to store the waste type name
  // eslint-disable-next-line camelcase
  name_waste_type: string;

  // Class variable to store the waste type url
  // eslint-disable-next-line camelcase
  url_waste_type: string;

  /**Detail
   * User Story Id: M1NG9
   * Allows to inject services to the model for navigation and PlacesService
   * @param  {PlacesService} placeService 
   * @param  {NavController} navCtrl
   * @param  {AlertController} alertCtrl
   * @param  {WasteService} wasteService
   * @returns 
   */
  constructor(
    private placeService: PlacesService,
    private navCtrl: NavController,
    private alertCtrl: AlertController,
    private wasteService: WasteService
  ) { }

  /**
   * User Story Id: M1NG9
   * Fuction that is executen when the page instantiated
   * @param  
   * @returns 
   */
  ngOnInit() {
  }

  /**
   * User Story Id: M1NG9
   * Fuction that is executed when the page shown  loads all the waste types avalable using the PlacesService service
   * @param  
   * @returns 
   */
  ionViewWillEnter() {
    this.wasteService.getWastes().then( data => { this.wasteTypes = data; });
    
  }

  /**
   * User Story Id: M1NG9
   * Method that update the array that stores the checked waste types 
   * @param {string} wasteId
   * @returns 
   */
  changeChecked(wasteId: string){
    if(!this.checkedWasteTypes.includes(wasteId)){
      this.checkedWasteTypes.push(wasteId);
      console.log(this.checkedWasteTypes);
    }else{
      this.checkedWasteTypes = this.checkedWasteTypes.filter(e => e !== wasteId);
      console.log(this.checkedWasteTypes);
    }
    
  }

  /**
   * User Story Id: M1NG9
   * Method that calles the addPlaceTypeFb method form the service PlacesService to add a new Place Type and it wastes types to the database
   * @param 
   * @returns 
   */
  addPlaceType(){

    this.placeService.addPlaceTypeFB(this.name_waste_type, this.url_waste_type).then(() => {
      this.alertCtrl.create ({
        header: 'Mensaje de Confirmación',
        message: 'El tipo de lugar de residuo "' + this.name_waste_type + '" se ha registrado correctamente',
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
