/* eslint-disable max-params */
import { Component, OnInit } from '@angular/core';
import { TipoInstalacion } from 'src/app/core/models/tipo-instalacion.model';
import { PlacesService } from 'src/app/core/services/places.service';
import { ActivatedRoute } from '@angular/router';
import { NavController, AlertController } from '@ionic/angular';
import { WasteService } from 'src/app/core/services/waste.service';
import { WasteType, PlacesWasteTypes } from 'src/app/core/models/waste-type';

@Component({
  selector: 'app-update-place-type',
  templateUrl: './update-place-type.page.html',
  styleUrls: ['./update-place-type.page.scss'],
})

/**
   * User Story Id: M1NG11
   * Allows the Update Place Type Page to be available for imports
   * @param  
   * @returns 
   */
export class UpdatePlaceTypePage implements OnInit {

  loadedPlaceType: TipoInstalacion;
  // eslint-disable-next-line camelcase
  name_waste_type: string;
  // eslint-disable-next-line camelcase
  url_waste_type: string;
  placeId: string;
  checkedwasteTypes: WasteType[];
  uncheckedwasteTypes: WasteType[]
  placeWasteTypeToDelete: PlacesWasteTypes[];
  placeWasteTypeToUpdate: string[];


  
  /**
   * User Story Id: M1NG11
   * Allows to inject services to the model for navigation, PlacesService and alerts
   * @param  {ActivatedRoute} activatedRoute
   * @param  {PlacesService} placeService 
   * @param  {NavController} navCtrl
   * @param  {AlertController} alertCtrl
   * @param  {WasteService} wasteService
   * @returns 
   */
  constructor(
    private activatedRoute: ActivatedRoute,
    private placeService: PlacesService,
    private navCtrl: NavController,
    private alertCtrl: AlertController,
    private wasteService: WasteService
  ) { }

  /**
   * User Story Id: M1NG11
   * Fuction that is executed when the page instantiated, which verifies that the Active Route contains the "updatePlaceTypeId" property
   * @param  
   * @returns 
   */
  ngOnInit() {
    this.activatedRoute.paramMap.subscribe(paraMap => {
      if (!paraMap.has('updatePlaceTypeId')) {
        return;
      }
      const wasteId = paraMap.get('updatePlaceTypeId');
      if (wasteId) {
        this.placeId = wasteId;
        this.placeService.getPlaceTypeByID(wasteId).then(waste => {
          this.loadedPlaceType = waste;
          this.name_waste_type = this.loadedPlaceType.name;
          this.url_waste_type = this. loadedPlaceType.icon_url;
        });
        this.placeService.getAllWasteTypeByPlaceType(wasteId).then(data => {
          this.wasteService.getWastes().then(wastes => {
            this.checkedwasteTypes = this.wasteService.getWastesByWasteId(data,wastes);
            this.uncheckedwasteTypes = this.wasteService.getNoWastesByWasteId(data,wastes);
            this.placeWasteTypeToDelete = data;
            this.placeWasteTypeToUpdate = this.placeWasteTypeToDelete.map(item => item.waste_type);
          });
        });
      }
    });

  }

  /**
   * User Story Id: M1NG11
   * Method that update the array that stores the checked waste types 
   * @param {string} wasteId
   * @returns 
   */
  changeChecked(wasteId: string){
    if(!this.placeWasteTypeToUpdate.includes(wasteId)){
      this.placeWasteTypeToUpdate.push(wasteId);
    }else{
      this.placeWasteTypeToUpdate = this.placeWasteTypeToUpdate.filter(e => e !== wasteId);
    }
    
  }

  /**
   * User Story Id: M1NG11
   * Method that calles the updatePlaceType method form the service PlacesService to update an existing Place Type in the database and its related wastes types
   * @param 
   * @returns 
   */
  updatePlaceType(){
    //console.log(this.placeWasteTypeToDelete);
    for (const item of this.placeWasteTypeToDelete){
      //console.log('Id: ',item.id);
      this.placeService.deletePlaceWasteType(item.id);
    }
    //this.placeService.deletePlaceWasteType(this.placeId);

    for (const wasteid of this.placeWasteTypeToUpdate){
      this.placeService.insertPlaceWasteType(this.placeId, wasteid);
    }

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
