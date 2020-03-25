import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

/*tut https://www.youtube.com/watch?v=Yza_59DrRY8*/

@Component({
  selector: 'app-add-center',
  templateUrl: './add-center.page.html',
  styleUrls: ['./add-center.page.scss'],
})
export class AddCenterPage implements OnInit {

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
      { type: 'required', message: 'Código QR es requerido' },
    ],
    mainPicture: [
      { type: 'required', message: 'Foto del Centro es requerida' },
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
    ]
  };

  newCenterForm = this.formBuilder.group({
    name: ["", [Validators.required, Validators.maxLength(100)]],
    description: ["", [Validators.required, Validators.maxLength(100)]],
    latitude: ["", [Validators.required, Validators.pattern('^-?([1-8]?[1-9]|[1-9]0)\\.{1}\\d{1,6}')]],
    longitude: ["", [Validators.required, Validators.pattern('^-?((([1]?[0-7][0-9]|[1-9]?[0-9])\\.{1}\\d{1,6}$)|[1]?[1-8][0]\\.{1}0{1,6}$)')]],
    qrCode: ["", [Validators.required]], /*This should be a picture*/
    mainPicture: ["", [Validators.required]], /*This should be a picture*/
    address: this.formBuilder.group({
      street: ["", [Validators.required, Validators.maxLength(100)]],
      city: ["", [Validators.required, Validators.maxLength(100)]],/*City means 'municipio'*/
      zip: ["", [Validators.required, Validators.pattern('^\\d{5}$')]]
    })
  });

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
  }

  public submit(){
    console.log(this.newCenterForm.value);
  }

}
