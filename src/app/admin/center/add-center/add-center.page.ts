import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { PlacesService } from 'src/app/core/services/places.service';
import { TipoInstalacion } from 'src/app/core/models/tipo-instalacion.model';
import { ToastController } from '@ionic/angular';

/*tut https://www.youtube.com/watch?v=Yza_59DrRY8*/

@Component({
  selector: 'app-add-center',
  templateUrl: './add-center.page.html',
  styleUrls: ['./add-center.page.scss'],
})

/**
 * Class for Angular AddCenterPage module.
 */
export class AddCenterPage implements OnInit {
  loadedPlacetypes: TipoInstalacion[];
  /**
   * User Story ID: M1NG1
   * Function that returns the name field on the add center form.
   */
  get name() {
    return this.newCenterForm.get('name');
  }

  /**
   * User Story ID: M1NG1c
   * Function that returns the description field on the add center form.
   */
  get description() {
    return this.newCenterForm.get('description');
  }

  /**
   * User Story ID: M1NG1
   * Function that returns the latitude field on the add center form.
   */
  get latitude() {
    return this.newCenterForm.get('latitude');
  }

  /**
   * User Story ID: M1NG1
   * Function that returns the longitude field on the add center form.
   */
  get longitude() {
    return this.newCenterForm.get('longitude');
  }

  /**
   * User Story ID: M1NG1
   * Function that returns the qr code field on the add center form.
   */
  get qrCode() {
    return this.newCenterForm.get('qrCode');
  }

  /**
   * User Story ID: M1NG1
   * Function that returns the main picture field on the add center form.
   */
  get mainPicture() {
    return this.newCenterForm.get('mainPicture');
  }

  /**
   * User Story ID: M1NG1
   * Function that returns the street field on the add center form.
   */
  get street() {
    return this.newCenterForm.get('address.street');
  }

  /**
   * User Story ID: M1NG1
   * Function that returns the zip field on the add center form.
   */
  get zip() {
    return this.newCenterForm.get('address.zip');
  }

  /**
   * User Story ID: M1NG1
   * Function that returns the instalation type field on the add center form.
   */
  get instalationType() {
    return this.newCenterForm.get('instalationType');
  }

  public errorMessages = {
    name: [
      { type: 'required', message: 'Nombre es requerido' },
      { type: 'maxlength', message: 'La longitud del texto no debe ser mayor a 100 caracteres'}
    ],
    description: [
      { type: 'required', message: 'Descripción es requerida' },
      { type: 'maxlength', message: 'La longitud del texto no debe ser mayor a 100 caracteres'}
    ],
    latitude: [
      { type: 'required', message: 'Latitud es requerida' },
      { type: 'pattern', message: 'El formato no es correcto'}
    ],
    longitude: [
      { type: 'required', message: 'Longitud es requerida' },
      { type: 'pattern', message: 'El formato no es correcto'}
    ],
    qrCode: [
      { type: 'pattern', message: 'El URL no es correcto'}
    ],
    mainPicture: [
      { type: 'pattern', message: 'El URL no es correcto'}
    ],
    street: [
      { type: 'required', message: 'Calle es requerida' },
      { type: 'maxlength', message: 'La longitud del texto no debe ser mayor a 100 caracteres'}
    ],
    zip: [
      { type: 'required', message: 'Código Postal es requerido' },
    ],
    instalationType: [
      { type: 'required', message: 'Tipo de Instalación es requerido' },
    ]
  };

  newCenterForm = this.formBuilder.group({
    // eslint-disable-next-line @typescript-eslint/no-magic-numbers
    name: ['', [Validators.required, Validators.maxLength(100)]],
    // eslint-disable-next-line @typescript-eslint/no-magic-numbers
    description: ['', [Validators.required, Validators.maxLength(100)]],
    latitude: ['', [Validators.required, Validators.pattern('^[-+]?\\d+(\\.\\d+)?$')]],
    longitude: ['', [Validators.required, Validators.pattern('^[-+]?\\d+(\\.\\d+)?$')]],
    qrCode: ['', Validators.pattern('^(https?:\/\/[^ ]*\.(?:gif|png|jpg|jpeg))')], /*This should be a picture*/
    mainPicture: ['', Validators.pattern('^(https?:\/\/[^ ]*\.(?:gif|png|jpg|jpeg))')], /*This should be a picture*/
    address: this.formBuilder.group({
      // eslint-disable-next-line @typescript-eslint/no-magic-numbers
      street: ['', [Validators.required, Validators.maxLength(100)]],
      zip: ['', [Validators.required, Validators.pattern('^\\d{5}$')]]
    }),
    instalationType: ['', [Validators.required]]
  });

  /**
   * Constructor for the class, the external services required are the Form Builder for forms, 
   * Places Service for adding to the databse and the Toast Controller for showing a toast.
   * @param  {FormBuilder} privateformBuilder
   * @param  {PlacesService} privateplaceTypeService
   * @param  {ToastController} privatetoastCtrl
   */
  constructor(
    private formBuilder: FormBuilder,
    private placeTypeService: PlacesService,
    private toastCtrl: ToastController) { }
  /**
   * User Story ID: M1NG1
   * On ngOnInit all places are loaded.
   */
  ngOnInit() {
    this.placeTypeService.allPlaceTypes().then( data => { this.loadedPlacetypes=data });
  }
  /**
   * User Story ID: M1NG1
   * Function for updating the lat and long form fields when marker changes position.
   * @param  {} lugar
   */
  onChangeMarker(lugar) {
    this.newCenterForm.controls.latitude.setValue(lugar.location.lat);
    this.newCenterForm.controls.longitude.setValue(lugar.location.lng);
  }

  
  /**
   * User Story ID: M1NG1
   * Function for submiting the form of the new place.
   */
  public submit() {
    this.placeTypeService.createPlace(this.newCenterForm.value)
        .then(() => {
          // use id
          this.showToast('Lugar creado de manera exitosa');
          this.newCenterForm.reset();
          // this.navCtrl.navigateBack(['/admin/center']);
        }).catch(() => {
          this.showToast('Error al cargar el lugar');
          this.newCenterForm.reset();
        });
  }

  /**
   * User Story ID: M1NG1
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

