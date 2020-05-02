/* eslint-disable max-params */
import { Component, OnInit } from '@angular/core';
import { AlertController, NavController } from '@ionic/angular';
import { PlacesService } from 'src/app/core/services/places.service';
import { WasteService } from 'src/app/core/services/waste.service';
import { WasteType } from 'src/app/core/models/waste-type';
import { TipoInstalacion } from 'src/app/core/models/tipo-instalacion.model';
import { FormBuilder, Validators } from '@angular/forms';

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
  initialPlaceTypes: TipoInstalacion[];
  initialPlaceTypesId: string[];
  afterPlaceTypes: TipoInstalacion[];
  afterPlaceTypesId: string[];

  /**
   * User Story Id: M1NG9
   * Allows to get the name of the waste center of the form
   * @param  
   * @returns 
   */
  get name() {
    return this.newWasteForm.get('name');
  }


  /**
   * User Story Id: M1NG9
   * Allows to get the url of the waste center of the form
   * @param  
   * @returns 
   */
  get mainPicture() {
    return this.newWasteForm.get('mainPicture');
  }

  /**
   * User Story Id: M1NG9
   * Allows to get the selected wastes of the waste center of the form
   * @param  
   * @returns 
   */
  get placeWasteType() {
    return this.newWasteForm.get('placeWasteType');
  }

  public errorMessages = {
    name: [
      { type: 'required', message: 'Tipo de centro es requerido.' },
      { type: 'maxlength', message: 'La longitud del texto no debe ser mayor a 100 caracteres.'}
    ],
    mainPicture: [
      { type: 'required', message: 'La Url de la imagen es requerida.' },
      { type: 'pattern', message: 'La URL no es correcta.' }
    ],
    placeWasteType: [
      { type: 'required', message: 'Es necesario seleccionar al menos un tipo de desecho.' }
    ]
  };

  newWasteForm = this.formBuilder.group({
    // eslint-disable-next-line @typescript-eslint/no-magic-numbers
    name: ['', [Validators.required, Validators.maxLength(100)]],
    mainPicture: ['',[Validators.required, Validators.pattern('^(https?:\/\/[^ ]*\.(?:gif|png|jpg|jpeg))')]],
    placeWasteType: ['',[Validators.required]]
  });

  /**
   * User Story Id: M1NG9
   * Allows to inject services to the model for navigation and PlacesService
   * @param  {PlacesService} placeService 
   * @param  {NavController} navCtrl
   * @param  {AlertController} alertCtrl
   * @param  {WasteService} wasteService
   * @param  {FormBuilder} formBuilder
   * @returns 
   */
  constructor(
    private placeService: PlacesService,
    private navCtrl: NavController,
    private alertCtrl: AlertController,
    private wasteService: WasteService,
    private formBuilder: FormBuilder
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
    this.placeService.allPlaceTypes().then(data => {
      this.initialPlaceTypes = data;
      this.initialPlaceTypesId = this.initialPlaceTypes.map(item => item.id)
    });    
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
    }else{
      this.checkedWasteTypes = this.checkedWasteTypes.filter(e => e !== wasteId);
    }
    // eslint-disable-next-line @typescript-eslint/no-magic-numbers
    if(this.checkedWasteTypes.length < 1){
      this.newWasteForm.setValue({
        name: this.newWasteForm.get('name').value,
        mainPicture: this.newWasteForm.get('mainPicture').value,
        placeWasteType: ''
      });
    }else{
      this.newWasteForm.setValue({
        name: this.newWasteForm.get('name').value,
        mainPicture: this.newWasteForm.get('mainPicture').value,
        placeWasteType: 'true'
      });
    }  
    
  }

  /**
   * User Story Id: M1NG9
   * Method that calles the addPlaceTypeFb method form the service PlacesService to add a new Place Type and it wastes types to the database
   * @param 
   * @returns 
   */
  addPlaceType(){
    let keys: string[] = this.initialPlaceTypesId;
    this.placeService.addPlaceTypeFB(this.newWasteForm.get('name').value, this.newWasteForm.get('mainPicture').value).then(() => {
      this.placeService.allPlaceTypes().then(data => {
        this.afterPlaceTypes = data;
        this.afterPlaceTypesId = this.afterPlaceTypes.map(item => item.id);
        let result: string[];
        result = this.afterPlaceTypesId.filter(function(item){
          return !keys.includes(item);
        });
        for(const item of this.checkedWasteTypes){
          // eslint-disable-next-line @typescript-eslint/no-magic-numbers
          this.placeService.insertPlaceWasteType(result[0], item);
        }
      });
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

  /**
   * User Story Id: M1NG11
   * Method that is called when the update is cancel to get the user's confirmation
   * @param 
   * @returns 
   */
  cancelAdd(){
    this.alertCtrl.create ({
      header: 'Mensaje de Confirmación',
      message: 'La nueva categoría de residuo no se guardará.',
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

}
