import { Component, OnInit } from '@angular/core';
import { TipoInstalacion } from 'src/app/core/models/tipo-instalacion.model';
import { PlacesService } from 'src/app/core/services/places.service';
import { ActivatedRoute } from '@angular/router';
import { NavController, AlertController, ToastController } from '@ionic/angular';
import { WasteService } from 'src/app/core/services/waste.service';
import { WasteType, PlacesWasteTypes } from 'src/app/core/models/waste-type';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-update-place-type',
  templateUrl: './update-place-type.page.html',
  styleUrls: ['./update-place-type.page.scss'],
})

/**
   * User Story Id: M1NG11,M1NG7
   * Allows the Update Place Type Page to be available for imports
   * @param  
   * @returns 
   */
export class UpdatePlaceTypePage implements OnInit {

  loadedPlaceType: TipoInstalacion;
  nameWasteType: string;
  urlWasteType: string;
  placeId: string;
  checkedwasteTypes: WasteType[];
  uncheckedwasteTypes: WasteType[]
  placeWasteTypeToDelete: PlacesWasteTypes[];
  placeWasteTypeToUpdate: string[];

  /**
   * User Story Id: M1NG11,M1NG7
   * Allows to get the name of the waste center of the form
   * @param  
   * @returns 
   */
  get name() {
    return this.newPlaceForm.get('name');
  }


  /**
   * User Story Id: M1NG11,M1NG7
   * Allows to get the url of the waste center of the form
   * @param  
   * @returns 
   */
  get mainPicture() {
    return this.newPlaceForm.get('mainPicture');
  }

  /**
   * User Story Id: M1NG11,M1NG7
   * Allows to get the selected wastes of the waste center of the form
   * @param  
   * @returns 
   */
  get placeWasteTypeToUpdateTrueFalse() {
    return this.newPlaceForm.get('placeWasteTypeToUpdateTrueFalse');
  }

  public errorMessages = {
    name: [
      { type: 'required', message: 'Tipo de centro es requerido.' },
      { type: 'maxlength', message: 'La longitud del texto no debe ser mayor a 30 caracteres.'}
    ],
    mainPicture: [
      { type: 'required', message: 'La Url de la imagen es requerida.' },
      { type: 'pattern', message: 'La URL no es correcta.' }
    ],
    placeWasteTypeToUpdateTrueFalse: [
      { type: 'required', message: 'Es necesario seleccionar al menos un tipo de desecho.' }
    ]
  };

  newPlaceForm = this.formBuilder.group({
    // eslint-disable-next-line @typescript-eslint/no-magic-numbers
    name: ['', [Validators.required, Validators.maxLength(30)]],
    mainPicture: ['',[Validators.required, Validators.pattern('^(https?:\/\/[^ ]*\.(?:gif|png|jpg|jpeg))')]],
    placeWasteTypeToUpdateTrueFalse: ['',[Validators.required]]
  });

  
  /**
   * User Story Id: M1NG11,M1NG7
   * Allows to inject services to the model for navigation, PlacesService and alerts
   * @param  {ActivatedRoute} activatedRoute
   * @param  {PlacesService} placeService 
   * @param  {NavController} navCtrl
   * @param  {AlertController} alertCtrl
   * @param  {WasteService} wasteService
   * @param  {FormBuilder} formBuilder
   * @returns 
   */
  constructor(
    private activatedRoute: ActivatedRoute,
    private placeService: PlacesService,
    private navCtrl: NavController,
    private alertCtrl: AlertController,
    private wasteService: WasteService,
    private formBuilder: FormBuilder,
    private toastCtrl: ToastController
  ) { }

  /**
   * User Story Id: M1NG11,M1NG7
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
          this.nameWasteType = this.loadedPlaceType.name;
          this.urlWasteType = this. loadedPlaceType.icon_url;
        });
        this.placeService.getAllWasteTypeByPlaceType(wasteId).then(data => {
          this.wasteService.getWastes().then(wastes => {
            this.checkedwasteTypes = this.wasteService.getWastesByWasteId(data,wastes);
            this.uncheckedwasteTypes = this.wasteService.getNoWastesByWasteId(data,wastes);
            this.placeWasteTypeToDelete = data;
            this.placeWasteTypeToUpdate = this.placeWasteTypeToDelete.map(item => item.waste_type);
            this.newPlaceForm.setValue({
              name: this.nameWasteType,
              mainPicture: this.urlWasteType,
              placeWasteTypeToUpdateTrueFalse: 'true'
            });
          });
        }); 
      }
    });

  }

  /**
   * User Story Id: M1NG11,M1NG7
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
    // eslint-disable-next-line @typescript-eslint/no-magic-numbers
    if(this.placeWasteTypeToUpdate.length < 1){
      this.newPlaceForm.setValue({
        name: this.newPlaceForm.get('name').value,
        mainPicture: this.newPlaceForm.get('mainPicture').value,
        placeWasteTypeToUpdateTrueFalse: ''
      });
    }else{
      this.newPlaceForm.setValue({
        name: this.newPlaceForm.get('name').value,
        mainPicture: this.newPlaceForm.get('mainPicture').value,
        placeWasteTypeToUpdateTrueFalse: 'true'
      });
    }  
  }

  /**
   * User Story Id: M1NG11,M1NG7
   * Calls the updatePlaceType method form the service PlacesService to update an existing Place Type 
   * in the database and its related wastes types
   * @param 
   * @returns 
   */
  updatePlaceType(){
    this.placeService.updatePlaceType(this.loadedPlaceType.id, this.newPlaceForm.get('name').value, 
        this.newPlaceForm.get('mainPicture').value).then(() => {
      for (const item of this.placeWasteTypeToDelete){
        this.placeService.deletePlaceWasteType(item.id);
      }
      for (const wasteid of this.placeWasteTypeToUpdate){
        this.placeService.insertPlaceWasteType(this.placeId, wasteid);
      }
      this.showToast('Categoría de residuos actualizada de manera exitosa');
      this.newPlaceForm.reset();
      this.navCtrl.navigateBack(['/admin/center/place-type']);
    }).catch(() => {
      this.showToast('Error al guardar los cambios a la categoría de residuos');
      this.navCtrl.navigateBack(['/admin/center/place-type']);
    });
  }

  /**
   * User Story Id: M1NG11,M1NG7
   * Method that is called when the update is cancel to get the user's confirmation
   * @param 
   * @returns 
   */
  cancelUpdate(){
    this.alertCtrl.create ({
      header: 'Mensaje de Confirmación',
      message: 'La modificaciones realizadas a la categoría de residuos no se guardarán.',
      buttons: [{
        text: 'Aceptar',
        handler: () => {
          this.navCtrl.navigateBack(['/admin/center/place-type']);
        }
      },{
        text: 'Cancelar',
        role: 'cancel'
      }]
    }).then(alertEl => {
      alertEl.present();
    });
  }

  /**
   * User Story ID: M1NG11,M1NG7
   * Function for showing the toast to the user.
   * @param  {} msg
   */
  public showToast(msg) {
    this.toastCtrl.create({
      message: msg,
      duration: 2000,
      position: 'middle',
      color: 'success'
    }).then(toast => toast.present());
  }

}
