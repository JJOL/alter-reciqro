import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { LugaresService } from 'src/app/core/services/lugares.service';
import { TipoInstalacion } from 'src/app/core/models/tipo-instalacion.model';
import { Observable } from 'rxjs';


/*tut https://www.youtube.com/watch?v=Yza_59DrRY8*/

@Component({
  selector: 'app-add-center',
  templateUrl: './add-center.page.html',
  styleUrls: ['./add-center.page.scss'],
})
export class AddCenterPage implements OnInit {
  loadedPlacetypes:  TipoInstalacion[];

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

  get city(){
    return this.newCenterForm.get('address.city');
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
    city: [
      { type: 'required', message: 'Municipio es requerido' },
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
      city: ["", [Validators.required, Validators.maxLength(100)]],/*City means 'municipio'*/
      zip: ["", [Validators.required, Validators.pattern('^\\d{5}$')]]
    }),
    instalationType: ["", [Validators.required]]
  });

  constructor(private formBuilder: FormBuilder, private placeTypeService: LugaresService) { }

  ngOnInit() {
    this.placeTypeService.getAllPlaces().then( data => { this.loadedPlacetypes=data});
  }
  
  onChangeMarker(lugar){
    this.newCenterForm.controls['latitude'].setValue(lugar.latitud);
    this.newCenterForm.controls['longitude'].setValue(lugar.longitud);
  }
  
  public submit(){
    console.log(this.newCenterForm.value);
  }

}

