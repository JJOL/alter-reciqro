import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

import { FormBuilder, Validators } from '@angular/forms';
import { LugaresService } from 'src/app/core/services/lugares.service';
import { TipoInstalacion } from 'src/app/core/models/tipo-instalacion.model';
import { ToastController } from '@ionic/angular';
import { Router } from '@angular/router';


/*tut https://www.youtube.com/watch?v=Yza_59DrRY8*/

@Component({
  selector: 'app-add-center',
  templateUrl: './add-center.page.html',
  styleUrls: ['./add-center.page.scss'],
})

export class AddCenterPage implements OnInit {
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
    private formBuilder: FormBuilder, 
    private placeTypeService: LugaresService,
    private navCtrl: NavController,
    private toastCtrl: ToastController,
    private router: Router) { }

  ngOnInit() {
    //this.placeTypeService.allPlaceTypes().then( data => { this.loadedPlacetypes=data });
  }

  ionViewDidEnter(){

  }
  
  onChangeMarker(lugar: { latitud: any; longitud: any; }){
    this.newCenterForm.controls['latitude'].setValue(lugar.latitud);
    this.newCenterForm.controls['longitude'].setValue(lugar.longitud);
  }
  
  public submit() {
    this.placeTypeService.createPlace(this.newCenterForm.value)
    .then(id => {
      // use id
      this.showToast('Lugar creado de manera exitosa');
      this.newCenterForm.reset();
      //this.navCtrl.navigateBack(['/admin/center']);
    })
    .catch(err => {
      this.showToast('Error al cargar el lugar');
      this.newCenterForm.reset();
    })
  }

  showToast(msg) {
    this.toastCtrl.create({
      message: msg,
      duration: 2000,
      position: 'middle',
      color: 'success'
    }).then(toast => toast.present());
  }

}

