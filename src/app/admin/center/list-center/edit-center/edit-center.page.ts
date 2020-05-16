import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavController, ToastController } from '@ionic/angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { PlacesService } from 'src/app/core/services/places.service';
import { Place } from 'src/app/core/models/place.model';
import { TipoInstalacion } from 'src/app/core/models/tipo-instalacion.model';

const MAXLENGTH =300

@Component({
  selector: 'app-edit-center',
  templateUrl: './edit-center.page.html',
  styleUrls: ['./edit-center.page.scss'],
})

/**
  * User Story ID: M1NG2
   * Component of the page for editing centers.
   * 
*/
export class EditCenterPage implements OnInit {
  updateBookingForm: FormGroup;

  place: Place;
  loadedPlacetypes: TipoInstalacion[];
  @ViewChild ('mapElement', {static: true}) map;
  position: { lat: number, lng: number};
 

  /**
   * User Story ID: M1NG2
   * Returns the name of the center.
   * @returns {string}
   */
  get name() {
    return this.newCenterForm.get('name');
  }

  
  /**
   * User Story ID: M1NG2
   * Returns the description of the center.
   * @param  {string} {description}
   */
  get description() {
    return this.newCenterForm.get('description');
  }

  /**
   * User Story ID: M1NG2
   * Returns longitude coordinate part.
   * @param  {number} {longitude}
   */
  get longitude() {
    return this.newCenterForm.get('longitude');
  }
  /**
   * User Story ID: M1NG2
   * Returns latitude coordinate part.
   * @param  {number}
   */
  get latitude() {
    return this.newCenterForm.get('latitude');
  }
  /**
   * User Story ID: M1NG2
   * Returns the Qr code.
   * @param  {string} {qrCode}
   */
  get qrCode() {
    return this.newCenterForm.get('qrCode');
  }
  /**
   * User Story ID: M1NG2
   * Returns the image URL.
   * @param  {string} {picture}
   */
  get mainPicture() {
    return this.newCenterForm.get('mainPicture');
  }

  /**
   * User Story ID: M1NG2
   * Returns the street.
   * @param  {string} {street}
   */
  get street() {
    return this.newCenterForm.get('address.street');
  }
  /**
   * User Story ID: M1NG2
   * Returns the Postal Code.
   * @param  {number} {zip}
   */
  get zip() {
    return this.newCenterForm.get('address.zip');
  }

  /**
   * User Story ID: M1NG2
   * Returns the type of instalation of the center.
   * @param  {string} {instalationType}
   */
  get instalationType() {
    return this.newCenterForm.get('instalationType');
  }

  /**
   * User Story ID: M1NG2
   * Returns the schedule of the center.
   */
  get schedule(){
    return this.newCenterForm.get('schedule');
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
    
    ],
    instalationType: [
      { type: 'required', message: 'Tipo de Instalación es requerido' },
    ],
    schedule: [
      { type: 'required', message: 'Horario es requerido' },
      { type: 'maxlength', message: 'El horario debe estar en formato "HH:MM:SS a HH:MM:SS" o "24 horas"' },
    ],
  };

  newCenterForm = this.formBuilder.group({
    name: ['', [Validators.required, Validators.maxLength(MAXLENGTH)]],
    description: ['', [Validators.required, Validators.maxLength(MAXLENGTH)]],
    latitude: ['', [Validators.required, Validators.pattern('^[-+]?\\d+(\\.\\d+)?$')]],
    longitude: ['', [Validators.required, Validators.pattern('^[-+]?\\d+(\\.\\d+)?$')]],
    qrCode: [''],
    mainPicture: ['', Validators.pattern('^(https?:\/\/[^ ]*\.(?:gif|png|jpg|jpeg))')], /*This should be a picture*/
    address: this.formBuilder.group({
      street: ['', [Validators.required, Validators.maxLength(MAXLENGTH)]],
      zip: [' ']
    }),
    instalationType: ['', [Validators.required]],
    schedule: ['', [Validators.required, Validators.maxLength(MAXLENGTH)]]
  });

  
  /**
   * User Story ID: M1NG2
   * Class constructor.
   * @param  {ActivatedRoute} privateactivatedRoute
   * @param  {PlacesService} privateplaceService
   * @param  {NavController} privatenavCtrl
   * @param  {FormBuilder} publicformBuilder
   * @param  {ToastController} privatetoastCtrl
   */ 
  constructor(
    private activatedRoute: ActivatedRoute,
    private placeService: PlacesService,
    private navCtrl: NavController,
    public formBuilder: FormBuilder,
    private toastCtrl: ToastController
  ) { }

  
  /**
   * User Story ID: M1NG2
   * We get the necessary catalogues for the center edition (filling the form).
   */
  ngOnInit() {
    
    this.activatedRoute.paramMap.subscribe(paraMap => {
      if (!paraMap.has('centerId')) {
        return;
      }

      this.placeService.allPlaceTypes().then( data => { 
        this.loadedPlacetypes = data; 


        const placeId = paraMap.get('centerId');
        if (placeId) {
          this.placeService.getPlaceByID(placeId).then(place => {
            this.place = place;
            this.newCenterForm.controls.latitude.setValue(place.location.lat);
            this.newCenterForm.controls.longitude.setValue(place.location.lng);
            this.newCenterForm.controls.name.setValue(place.name);
            this.newCenterForm.controls.description.setValue(place.description);
            this.newCenterForm.controls.schedule.setValue(place.schedule);
            this.newCenterForm.controls.mainPicture.setValue(place.photo);
            
            this.newCenterForm.patchValue({
              address: {
                zip: place.postal_code,
                street: place.address
              }
            });
            setTimeout(()=>{
              this.newCenterForm.controls.instalationType.setValue(place.places_type.id);
            },100)
            this.position={
              lat:place.location.lat,
              lng:place.location.lng
            };
            this.map.setCenter(this.position);
          });
        }
      });
    });
  }


  /**
   * User Story ID: M1NG2
   * This function is called whenever the marker is dragged.
   * @param  {Location} lugar 
   */
  onChangeMarker(lugar) {
    this.newCenterForm.controls.latitude.setValue(lugar.location.lat);
    this.newCenterForm.controls.longitude.setValue(lugar.location.lng);
  }

  
  /**
   * User Story ID: M1NG2
   * This function is called when the form gets submited.
   */
  public submit() {
    this.activatedRoute.paramMap.subscribe(paraMap => {
      if (!paraMap.has('centerId')) {
        // redirect
        return;
      }
      const placeId = paraMap.get('centerId');


      this.placeService.editPlace(this.newCenterForm.value, placeId)
          .then(() => {
            // use id
            this.showToast('Lugar editado de manera exitosa');
            this.newCenterForm.reset();
            this.navCtrl.navigateBack(['/admin/center/list-center']);
          })
          .catch(() => {
            this.showToast('Error al cargar el lugar');
            this.newCenterForm.reset();
          });
    }); }

  /**
   * User Story ID: M1NG2
   * This function shows the toast.
   * @param  {string} msg
   */
  showToast(msg) {
    this.toastCtrl.create({
      message: msg,
      duration: 2000,
      position: 'middle',
      color: 'success'
    }).then(toast => toast.present());
  }
}
