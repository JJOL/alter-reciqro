import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { WasteService } from 'src/app/core/services/waste.service';
import { WasteType } from 'src/app/core/models/waste-type';
import { NavController, AlertController, ToastController } from '@ionic/angular';
import { FormBuilder, Validators } from '@angular/forms';

import { MAX_TITLE_FIELD_LENGTH, MAX_DESCRIPTION_FIELD_LENGTH } from 'src/app/core/constants';

@Component({
  selector: 'app-update-waste-type',
  templateUrl: './update-waste-type.page.html',
  styleUrls: ['./update-waste-type.page.scss'],
})

/**
 * User Story Id: M2NG12
 * Allows the UpdateWasteTypePage available for imports
 */
export class UpdateWasteTypePage implements OnInit {

  loadedWasteType: WasteType;
  wasteId: string;

  /**
   * User Story Id: M2NG12
   * Allows to get the title of the waste of the form
   */
  get title() {
    return this.newWasteForm.get('title');
  }


  /**
   * User Story Id: M2NG12
   * Allows to get the description of the waste of the form
   */
  get description() {
    return this.newWasteForm.get('description');
  }

  /**
   * User Story Id: M2NG12
   * Allows to get the url of the waste of the form
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
    // eslint-disable-next-line @typescript-eslint/no-magic-numbers
    title: ['', [Validators.required, Validators.maxLength(MAX_TITLE_FIELD_LENGTH)]],
    url: ['',[Validators.required]],
    description: ['',[Validators.required, Validators.maxLength(MAX_DESCRIPTION_FIELD_LENGTH)]]
  });



  /**
   * User Story Id: M2NG12
   * Construtor of the class that uses the FormBuilder, WasteService, NavController, AlertController and ActivatedRoute
   * @param  {FormBuilder} formBuilder
   * @param  {WasteService} wasteService
   * @param  {NavController} navCtrl
   * @param  {AlertController} alertCtrl
   * @param  {ActivatedRoute} activatedRoute
   * @returns 
   */
  constructor(
    private formBuilder: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private wasteService: WasteService,
    private navCtrl: NavController,
    private alertCtrl: AlertController,
    private toastCtrl: ToastController
  ) { }

  /**
   * User Story Id: M2NG12
   * Method called when the page is instatiated used to get the info of the selected waste type
   * @param  
   * @returns 
   */
  ngOnInit() {
    this.activatedRoute.paramMap.subscribe(paraMap => {
      if (!paraMap.has('wasteId')) {
        return;
      }
      const wasteId = paraMap.get('wasteId');
      if (wasteId) {
        this.wasteId = wasteId;
        this.wasteService.getWasteById(wasteId).then(waste => {
          this.loadedWasteType = waste;
          this.newWasteForm.setValue({
            title: this.loadedWasteType.name,
            url: this.loadedWasteType.icon,
            description: this.loadedWasteType.description
          });
        });
      }
    });
  }

  /**
   * User Story Id: M2NG12
   * Method called when the waste types is updated usign the WasteService
   * @param  
   * @returns 
   */
  updateWasteType(){
    this.wasteService.updateWasteType(this.wasteId,
        this.newWasteForm.get('title').value,
        this.newWasteForm.get('url').value,
        this.newWasteForm.get('description').value).then(() => {
      this.showToast('Tipo de residuo actualizado de manera exitosa');
      this.newWasteForm.reset();
      this.navCtrl.navigateBack(['/admin/center/waste-type']);
    }).catch(() => {
      this.showToast('Error al guardar los cambios del tipo de residuo');
      this.navCtrl.navigateBack(['/admin/center/waste-type']);
    });
  }

  /**
   * User Story Id: M2NG12
   * Method called  when the update of the waste type is cancelled to get user confirmation
   */
  cancelUpdate() {
    this.alertCtrl.create ({
      header: 'Mensaje de Confirmación',
      message: 'Los cambios generados no se guardarán.',
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

  /**
   * User Story ID: M2NG12
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
