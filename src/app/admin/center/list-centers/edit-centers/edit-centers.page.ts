import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController, NavController, ToastController } from '@ionic/angular';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { LugaresService } from 'src/app/core/services/lugares.service';
import { Place } from 'src/app/core/models/lugar.model';
import { TipoInstalacion } from 'src/app/core/models/tipo-instalacion.model';

import * as firebase from 'firebase/app';
const GeoPoint = firebase.firestore.GeoPoint;
@Component({
  selector: 'app-edit-centers',
  templateUrl: './edit-centers.page.html',
  styleUrls: ['./edit-centers.page.scss'],
})
export class EditCentersPage implements OnInit {
  updateBookingForm: FormGroup;
  
  place : Place={
    id : "",
    name : "", 
    description : "",
    location: {
      lat: 0.0,
      lng: 0.0,
  },
    qr_code : "",
    photo : "",
    address : "",
    postal_code : 0,
    places_type : {
      id : "",
      name : "",
      icon : ""
    }
  };
  loadedPlacetypes: TipoInstalacion[];

  get name(){
    return this.newCenterForm.get('name');
  }

  get description(){
    return this.newCenterForm.get('description');
  }

  get latitude(){
    return this.newCenterForm.get('latitude');
  }

  get longitude(){
    return this.newCenterForm.get('longitude');
  }

  get qrCode(){
    return this.newCenterForm.get('qrCode');
  }

  get mainPicture(){
    return this.newCenterForm.get('mainPicture');
  }

  get street(){
    return this.newCenterForm.get('address.street');
  }

  get zip(){
    return this.newCenterForm.get('address.zip');
  }

  get instalationType(){
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
    name: ["", [Validators.required, Validators.maxLength(100)]],
    description: ["", [Validators.required, Validators.maxLength(100)]],
    latitude: ["", [Validators.required, Validators.pattern('^[-+]?\\d+(\\.\\d+)?$')]],
    longitude: ["", [Validators.required, Validators.pattern('^[-+]?\\d+(\\.\\d+)?$')]],
    qrCode: ["", Validators.pattern('^(https?:\/\/[^ ]*\.(?:gif|png|jpg|jpeg))')], /*This should be a picture*/
    mainPicture: ["", Validators.pattern('^(https?:\/\/[^ ]*\.(?:gif|png|jpg|jpeg))')], /*This should be a picture*/
    address: this.formBuilder.group({
      street: ["", [Validators.required, Validators.maxLength(100)]],
      zip: ["", [Validators.required, Validators.pattern('^\\d{5}$')]]
    }),
    instalationType: ["", [Validators.required]]
  });

  constructor(
    private activatedRoute: ActivatedRoute,
    private placeService: LugaresService,
    private router: Router,
    private alertCtrl: AlertController,
    private navCtrl: NavController,
    public formBuilder: FormBuilder,
    private toastCtrl: ToastController
    ) { }

  ngOnInit() {
    console.log()
    
    this.placeService.allPlaceTypes().then( data => { this.loadedPlacetypes=data 
    
    
    });
    console.log(this.loadedPlacetypes);

    this.activatedRoute.paramMap.subscribe(paraMap => {
      if (!paraMap.has('centerId')) {
        //redirect
        return;

      }
      console.log()
      const placeId = paraMap.get('centerId');
      if (placeId) {
        this.placeService.getPlaceByID(placeId).then(place => {
          this.place = place;
          console.log(place)
          console.log(this.place.places_type.id);
          console.dir(this.place.places_type);
          console.log(this.place.location);
          this.newCenterForm.controls['latitude'].setValue(place.location.lat);
          this.newCenterForm.controls['longitude'].setValue(place.location.lng);
          this.newCenterForm.controls['name'].setValue(place.name);
          this.newCenterForm.controls['description'].setValue(place.description);
          this.newCenterForm.controls['qrCode'].setValue(place.qr_code);
          this.newCenterForm.controls['mainPicture'].setValue(place.photo);
          this.newCenterForm.patchValue({
            instalationType: place.places_type.id,
            address: {
              zip: place.postal_code,
              street: place.address
            }
          });
          
        });
      }
    });
    
  }

  

  onChangeMarker(lugar){
    this.newCenterForm.controls['latitude'].setValue(lugar.location.lat);
    this.newCenterForm.controls['longitude'].setValue(lugar.location.lng);
  }


  public submit() {
    this.activatedRoute.paramMap.subscribe(paraMap => {
      if (!paraMap.has('centerId')) {
        //redirect
        return;
      }
      console.log()
      const placeId = paraMap.get('centerId');
    

    this.placeService.editPlace(this.newCenterForm.value,placeId)
    .then(id => {
      // use id
      this.showToast('Lugar editado de manera exitosa');
      this.newCenterForm.reset();
      this.navCtrl.navigateBack(['/admin/center/list-centers']);

    })
    .catch(err => {
      this.showToast('Error al cargar el lugar');
      this.newCenterForm.reset();
    })
  })}
  
  showToast(msg) {
    this.toastCtrl.create({
      message: msg,
      duration: 2000,
      position: 'middle',
      color: 'success'
    }).then(toast => toast.present());
  }


}
