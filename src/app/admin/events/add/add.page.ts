import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import {  NavController, ToastController } from '@ionic/angular';
import { EventModel } from '../../../core/models/event.model';
import { EventsService } from 'src/app/core/services/events.service';

const MAXLENGTH = 100;
@Component({
  selector: 'app-add',
  templateUrl: './add.page.html',
  styleUrls: ['./add.page.scss'],
})
/**
 * Se obtine
 */
export class AddPage implements OnInit {
// eslint-disable-next-line require-jsdoc, max-params
  constructor(private eventService: EventsService,
              private activatedRoute: ActivatedRoute,
              private navCtrl: NavController,
              public formBuilder: FormBuilder,
              private toastCtrl: ToastController) { }

  /**
   * User Story ID: M1NG2
   * Regresa el nombre
   * @returns {string}
   */
  get name() {
    return this.editEventForm.get('name');
  }
  /**
   * User Story ID: M1NG2
   * Regresa la descripción del lugar
   * @param  {string} {description}
   */
  get description() {
    return this.editEventForm.get('description');
  }

  /**
   * User Story ID: M1NG2
   * Regresa la longitud de la coordenada
   * @param  {number} {longitude}
   */
  get longitude() {
    return this.editEventForm.get('longitude');
  }
  /**
   * User Story ID: M1NG2
   * Regresa la latitud de la coordenada
   * @param  {number}
   */
  get latitude() {
    return this.editEventForm.get('latitude');
  }
  /**
   * User Story ID: M1NG2
   * Regresa la url del código qr
   * @param  {string} {qrCode}
   */
  get icon() {
    return this.editEventForm.get('icon');
  }
  /**
   * User Story ID: M1NG2
   * Regresa la calle
   * @param  {string} {street}
   */
  get startDate() {
    return this.editEventForm.get('startDate');
  }
  /**
   * User Story ID: M1NG2
   * Regresa la calle
   * @param  {string} {street}
   */
  get endDate() {
    return this.editEventForm.get('endDate');
  }
  /**
   * User Story ID: M1NG2
   * Regresa la calle
   * @param  {string} {street}
   */
  get age() {
    return this.editEventForm.get('age');
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
    icon: [
      { type: 'pattern', message: 'El URL no es correcto'}
    ],
    startDate: [
      { type: 'required', message: 'Horario es requerido' },
      { type: 'maxlength', message: 'El horario debe estar en formato "HH:MM:SS a HH:MM:SS" o "24 horas"' },
    ],
    endDate: [
      { type: 'required', message: 'Horario es requerido' },
      { type: 'maxlength', message: 'El horario debe estar en formato "HH:MM:SS a HH:MM:SS" o "24 horas"' },
    ],
    age: [
      { type: 'required', message: 'Rango de edad es requerida' },
    ]
  };

  editEventForm = this.formBuilder.group({
    name: ['', [Validators.required, Validators.maxLength(MAXLENGTH)]],
    description: ['', [Validators.required, Validators.maxLength(MAXLENGTH)]],
    latitude: ['', [Validators.required, Validators.pattern('^[-+]?\\d+(\\.\\d+)?$')]],
    longitude: ['', [Validators.required, Validators.pattern('^[-+]?\\d+(\\.\\d+)?$')]],
    icon: ['', Validators.pattern('^(https?:\/\/[^ ]*\.(?:gif|png|jpg|jpeg))')], /*This should be a picture*/
    startDate: ['', [Validators.required, Validators.maxLength(100)]],
    endDate: ['', [Validators.required, Validators.maxLength(100)]],
    age: ['', [Validators.required, Validators.maxLength(20)]],
  });

  placeId: string;

  event: EventModel;
  // eslint-disable-next-line require-jsdoc
  ngOnInit() {

  }

  /**
   * User Story ID: M1NG1
   * Function for updating the lat and long form fields when marker changes position.
   * @param  {} lugar
   */
  onChangeMarker(lugar) {
    this.editEventForm.controls.latitude.setValue(lugar.location.lat);
    this.editEventForm.controls.longitude.setValue(lugar.location.lng);
  }

  /**
   * User Story ID: M4NG8
   * Function for showing the toast to the user.
   * @param  {} msg
   */
  showToast(msg) {
    this.toastCtrl.create({
      message: msg,
      duration: 2000,
      position: 'middle',
      color: 'success'
    }).then(toast => toast.present());
  }

  /**
   * Method that is used by the form when all the information has benn entered
   */
  submit() {
    this.eventService.createEvent(this.editEventForm.value).then(() => {
      // use id
      this.showToast('Lugar creado de manera exitosa');
      this.navCtrl.navigateBack(['/admin/events']);
    })
        .catch(() => {
          this.showToast('Error al cargar el lugar');
        });
  }


}
