import { Component, OnInit } from '@angular/core';
import { NavController, AlertController, ToastController } from '@ionic/angular';
import { WasteService } from 'src/app/core/services/waste.service';
import { FormBuilder, Validators } from '@angular/forms';

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
export class AddWasteTypePage implements OnInit {

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
    // eslint-disable-next-line @typescript-eslint/no-magic-numbers
    title: ['', [Validators.required, Validators.maxLength(100)]],
    url: ['',[Validators.required, Validators.pattern('^(https?:\/\/[^ ]*\.(?:gif|png|jpg|jpeg))')]],
    description: ['',[Validators.required, Validators.maxLength(300)]]
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
    private alertCtrl: AlertController,
    private toastCtrl: ToastController
  ) { }

  /**
   * User Story Id: M2NG14
   * Method called when the page is instatiated
   * @param  
   * @returns 
   */
  ngOnInit() {
  }

  
  /**
   * User Story Id: M2NG14
   * Method called to add a new waste type calling a method of the WasteService
   * @param  
   * @returns 
   */
  addWasteType(){
    this.wasteService.addWasteType(this.newWasteForm.get('title').value, this.newWasteForm.get('url').value, this.newWasteForm.get('description').value).then(() => {
      this.showToast('Residuo creado de manera exitosa');
      this.newWasteForm.reset();
      this.navCtrl.navigateBack(['/admin/center/waste-type']);
    }).catch(() => {
      this.showToast('Error al guardar el nuevo residuos');
      this.navCtrl.navigateBack(['/admin/center/waste-type']);
    });
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

  /**
   * User Story ID: M2NG14
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
