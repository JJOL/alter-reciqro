import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { PlacesService } from 'src/app/core/services/places.service';
import { TipoInstalacion } from 'src/app/core/models/tipo-instalacion.model';
import { ToastController } from '@ionic/angular';
import { parseGoogleGeoPointToDegrees, parseDegreesToGoogleGeoPoint } from '../../../core/utils/geopoint.util';
import { Place } from 'src/app/core/models/place.model';
import { Router } from '@angular/router';

const MAX_LEN = 300;

const DEFAULT_MARKER_PLACER: Place = {
  location: {
    lat: 20.588772,
    lng: -100.390292
  }
};


@Component({
  selector: 'app-add-center',
  templateUrl: './add-center.page.html',
  styleUrls: ['./add-center.page.scss'],
})

/**
 * User Story ID: M1NG1
 * Class for Angular AddCenterPage module.
 */
export class AddCenterPage implements OnInit {
  loadedPlacetypes: TipoInstalacion[];

  markedPlace: Place[] = [DEFAULT_MARKER_PLACER];

  /**
   * User Story ID: M1NG1
   * Function that returns the name field on the add center form.
   */
  get name() {
    return this.newCenterForm.get('name');
  }

  /**
   * User Story ID: M1NG1
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
    return this.newCenterForm.get('latlngdecimal.latitude');
  }

  /**
   * User Story ID: M1NG1
   * Function that returns the longitude field on the add center form.
   */
  get longitude() {
    return this.newCenterForm.get('latlngdecimal.longitude');
  }

  /**
   * User Story ID: M1NG1
   * Function that returns the longitude field on the add center form.
   */
  get latlngdegrees() {
    return this.newCenterForm.get('latlngdegrees');
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

  /**
   * User Story ID: M1NG1
   * Function that returns the schedule type field on the add center form.
   */
  get schedule(){
    return this.newCenterForm.get('schedule');
  }

  private alreadyEditing: boolean;

  public errorMessages = {
    name: [
      { type: 'required', message: 'Nombre es requerido' },
      { type: 'maxlength', message: 'La longitud del texto no debe ser mayor a 300 caracteres'}
    ],
    description: [
      { type: 'required', message: 'Descripción es requerida' },
      { type: 'maxlength', message: 'La longitud del texto no debe ser mayor a 300 caracteres'}
    ],
    latitude: [
      { type: 'required', message: 'Latitud es requerida' },
      { type: 'pattern', message: 'El formato no es correcto'}
    ],
    longitude: [
      { type: 'required', message: 'Longitud es requerida' },
      { type: 'pattern', message: 'El formato no es correcto'}
    ],
    latlngdegrees: [
      { type: 'required', message: 'LatLng en grados es requerida' },
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
      { type: 'maxlength', message: 'La longitud del texto no debe ser mayor a 300 caracteres'}
    ],
    instalationType: [
      { type: 'required', message: 'Tipo de Instalación es requerido' },
    ],
    schedule: [
      { type: 'required', message: 'Horario es requerido' },
      { type: 'maxlength', message: 'El horario debe estar en formato "HH:MM:SS a HH:MM:SS" o "24 horas"' },
    ],
    zip: [

    ]
  };
  newCenterForm = this.formBuilder.group({
    name: ['', [Validators.required, Validators.maxLength(MAX_LEN)]],
    description: ['', [Validators.required, Validators.maxLength(MAX_LEN)]],
    latlngdecimal: this.formBuilder.group({
      latitude: ['', [Validators.required, Validators.pattern('^[-+]?\\d+(\\.\\d+)?$')]],
      longitude: ['', [Validators.required, Validators.pattern('^[-+]?\\d+(\\.\\d+)?$')]],
    }),
    latlngdegrees: ['', [Validators.required, 
      Validators.pattern('^(-?\\d+)°(\\d+)\'(\\d+\.?\\d*)\"N\\s(-?\\d+)°(\\d+)\'(\\d+\.?\\d*)\"W$')]],
    qrCode: [' '],
    mainPicture: ['https://cdn0.iconfinder.com/data/icons/set-app-incredibles/24/Image-01-512.png'],
    address: this.formBuilder.group({
      street: ['', [Validators.required, Validators.maxLength(MAX_LEN)]],
      zip: [' ']
    }),
    instalationType: ['', [Validators.required]],
    schedule: ['', [Validators.required, Validators.maxLength(MAX_LEN)]]
  });

  /**
   * Constructor for the class, the external services required are the Form Builder for forms, 
   * Places Service for adding to the databse and the Toast Controller for showing a toast.
   * @param  {FormBuilder} privateformBuilder
   * @param  {PlacesService} privateplaceTypeService
   * @param  {ToastController} privatetoastCtrl
   * @param  {Router} router
   */
  constructor(
    private formBuilder: FormBuilder,
    private placeTypeService: PlacesService,
    private toastCtrl: ToastController,
    private router: Router) { }
  /**
   * User Story ID: M1NG1
   * On ngOnInit all places are loaded.
   */
  ngOnInit() {
    this.alreadyEditing = false;
    this.placeTypeService.allPlaceTypes().then( data => { this.loadedPlacetypes=data });
    this.newCenterForm.get('latlngdegrees').valueChanges.subscribe(this.onChangeDegree.bind(this));
    this.newCenterForm.get('latlngdecimal').valueChanges.subscribe(this.onChangeLatLng.bind(this));
  }
  
  /**
   * User Story ID: M1NG1
   * Function for updating the lat and long form fields when marker changes position.
   * @param  {} lugar
   */
  onChangeMarker(lugar) {
    (window as any).lugar = lugar;
    if (this.alreadyEditing) return;
    this.alreadyEditing = true;

    // Update LatLng
    this.newCenterForm.get('latlngdecimal.latitude').setValue(lugar.location.lat);
    this.newCenterForm.get('latlngdecimal.longitude').setValue(lugar.location.lng);
    // Update Degree Value
    this.newCenterForm.controls.latlngdegrees.setValue(parseGoogleGeoPointToDegrees(lugar.location));

    this.alreadyEditing = false;
  }

  /**
   * User Story ID: M1NG1
   * Function for updating the lat and long form fields when marker changes position with the SH coordinates.
   * @param  {} newVal
   */
  onChangeDegree(newVal: string) {
    if (this.alreadyEditing) return;
    this.alreadyEditing = true;

    const hasError = this.newCenterForm.get('latlngdegrees').invalid;
    if (!hasError) {
      let latlng = parseDegreesToGoogleGeoPoint(newVal);
      // Update LatLng
      this.newCenterForm.get('latlngdecimal.latitude').setValue(latlng.lat);
      this.newCenterForm.get('latlngdecimal.longitude').setValue(latlng.lng);
      // Update Map Marker
      this.markedPlace = [{
        location: latlng
      }];
    }
    this.alreadyEditing = false;
  }

  /**
   * User Story ID: M1NG1
   * Function for updating the lat and long form fields when marker changes position with the SH coordinates.
   * @param  {} newVal
   */
  onChangeLatLng(newVal: { latitude: number, longitude: number}) {
    if (this.alreadyEditing) return;
    this.alreadyEditing = true;

    const hasError = this.newCenterForm.get('latlngdecimal').invalid;
    if (!hasError) {
      let degreelatlng = parseGoogleGeoPointToDegrees({
        lat: newVal.latitude,
        lng: newVal.longitude
      });
      // Update LatLng Degree
      this.newCenterForm.controls.latlngdegrees.setValue(degreelatlng);
      // Update Map Marker
      this.markedPlace = [{
        location: {
          lat: newVal.latitude,
          lng: newVal.longitude
        }
      }];
    }
    this.alreadyEditing = false;
  }
  
  /**
   * User Story ID: M1NG1
   * Function for submiting the form of the new place.
   */
  public submit() {
    let inputPlaceObj = this.newCenterForm.value;
    inputPlaceObj.latitude  = parseFloat(inputPlaceObj.latlngdecimal.latitude);
    inputPlaceObj.longitude = parseFloat(inputPlaceObj.latlngdecimal.longitude);
     
    this.placeTypeService.createPlace(inputPlaceObj)
        .then(() => {
          this.showToast('Lugar creado de manera exitosa');
          this.newCenterForm.reset();
          this.router.navigate(['/admin/center/list-center']);
        }).catch(() => {
          this.showToast('Error al cargar el evento');
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
    }).then(toast => toast.present()).catch(() => {
      this.showToast('Error al cargar el toast');
    });
  }
}

