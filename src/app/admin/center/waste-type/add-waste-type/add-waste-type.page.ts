import { Component } from '@angular/core';
import { NavController, AlertController } from '@ionic/angular';
import { WasteService } from 'src/app/core/services/waste.service';
import { FormBuilder, Validators } from '@angular/forms';
import { MAX_DESCRIPTION_FIELD_LENGTH, MAX_TITLE_FIELD_LENGTH} from 'src/app/core/constants';

@Component({
  selector: 'app-add-waste-type',
  templateUrl: './add-waste-type.page.html',
  styleUrls: ['./add-waste-type.page.scss'],
})

/**
   * User Story Id: M2NG14
   * Allows the AddWasteTyePage available for imports
   * @param  
   * @returns 
   */
export class AddWasteTypePage {

  /**
   * User Story Id: M2NG14
   * Allows to get the title of the waste  of the form
   * @param  
   * @returns 
   */
  get title() {
    return this.newWasteForm.get('title');
  }


  /**
   * User Story Id: M2NG14
   * Allows to get the description of the waste of the form
   * @param  
   * @returns 
   */
  get description() {
    return this.newWasteForm.get('description');
  }

  /**
   * User Story Id: M2NG14
   * Allows to get the url of the waste of the form
   * @param  
   * @returns 
   */
  get url() {
    return this.newWasteForm.get('url');
  }

  public errorMessages = {
    title: [
      { type: 'required', message: 'Tipo de residuo es requerido.' },
      { type: 'maxlength', message: 'La longitud del texto no debe ser mayor a 100 caracteres.'}
    ],
    url: [
      { type: 'required', message: 'La Url de la imagen es requerida.' },
      { type: 'pattern', message: 'La URL no es correcta.' }
    ],
    description: [
      { type: 'required', message: 'Es necesario ingresar una descripción al residuo.' },
      { type: 'maxlength', message: 'La longitud del texto no debe ser mayor a 300 caracteres.'}
    ]
  };

  newWasteForm = this.formBuilder.group({
    title: ['', [Validators.required, Validators.maxLength(MAX_TITLE_FIELD_LENGTH)]],
    url: ['',[Validators.required]],
    description: ['',[Validators.required, Validators.maxLength(MAX_DESCRIPTION_FIELD_LENGTH)]]
  });


  /**
   * User Story Id: M2NG14
   * Construtor of the class that uses the FormBuilder, WasteService, NavController and AlertController
   * @param  {FormBuilder} formBuilder
   * @param  {WasteService} wasteService
   * @param  {NavController} navCtrl
   * @param  {AlertController} alertCtrl
   * @returns 
   */
  constructor(
    private formBuilder: FormBuilder,
    private wasteService: WasteService,
    private navCtrl: NavController,
    private alertCtrl: AlertController
  ) { }

  
  /**
   * User Story Id: M2NG14
   * Method called to add a new waste type calling a method of the WasteService
   * @param  
   * @returns 
   */
  addWasteType(){
    this.wasteService.addWasteType(
        this.newWasteForm.get('title').value,
        this.newWasteForm.get('url').value,
        this.newWasteForm.get('description').value
    ).then(() => {
      this.alertCtrl.create ({
        header: 'Mensaje de Confirmación',
        message: 'El tipo de residuo "' + this.newWasteForm.get('title').value + '" se ha registrado correctamente',
        buttons: [{
          text: 'Aceptar',
          role: 'accept'
        }]
      }).then(alertEl => {
        alertEl.present();
      });
      this.navCtrl.navigateBack(['/admin/center/waste-type']);
    })
        .catch(() => {});
  }

  /**
   * User Story Id: M2NG14
   * Method called  when the addition of the waste type is cancelled to get user confirmation
   * @param  
   * @returns 
   */
  cancelAdd(){
    this.alertCtrl.create ({
      header: 'Mensaje de Confirmación',
      message: 'El nuevo residuo no se guradará.',
      buttons: [{
        text: 'Aceptar',
        handler: () => {
          this.navCtrl.navigateBack(['/admin/center/waste-type']);
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
