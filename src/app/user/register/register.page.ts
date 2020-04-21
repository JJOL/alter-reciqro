import { Component, OnInit } from '@angular/core';
import { AlertController, NavController, ToastController } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from 'src/app/core/services/auth.service';


import * as firebase from 'firebase/app';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  updateBookingForm: FormGroup;
  get email() {
    return this.newCenterForm.get('email');
  }
  get password() {
    return this.newCenterForm.get('password');
  }
  get confirmPassword() {
    return this.newCenterForm.get('confirmPassword');
  }
  
  get alias() {
    return this.newCenterForm.get('alias');
  }
  get delegation_id() {
    return this.newCenterForm.get('delegation_id');
  }

  public errorMessages = {
    alias: [
      { type: 'required', message: 'Alias es requerido' },
      { type: 'maxlength', message: 'La longitud del texto no debe ser mayor a 100 caracteres'}
    ],
    
    email: [
      { type: 'required', message: 'Email es requerido' },
      { type: 'pattern', message: 'El formato de email no es correcto'}
    ],
    password: [
      { type: 'required', message: 'Una contraseña es requerida' },
      { type: 'minlength', message: 'Debe tener una longitud minima de 8 caracteres'}
    ],
    confirmPassword: [
      { type: 'required', message: 'La confirmacion de contraseña es requerida' }
    ],
    
    delegationId: [
      { type: 'required', message: 'Es necesario elegir una delegación'}
    ],
    
  };

  newCenterForm = this.formBuilder.group({
    alias: ['', [Validators.required, Validators.maxLength(100)]],
    email: ['', [Validators.required, Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')]],
    password: ['', [Validators.required, Validators.minLength(8)]],
    confirmPassword: ['', Validators.required],
    delegationId: ['', Validators.required], 
   });

  constructor(
    private activatedRoute: ActivatedRoute,
    private authService: AuthService,
    private router: Router,
    private alertCtrl: AlertController,
    private navCtrl: NavController,
    public formBuilder: FormBuilder,
    private toastCtrl: ToastController
    ) { }

  ngOnInit() {
  }
  public submit() {
    this.authService.sendPasswordResetEmail(this.newCenterForm.value.email).then(id => {
    
    this.showToast('Si tu email esta registrado te llegara un correo para restablecer tu contraseña');
    this.newCenterForm.reset();
    this.navCtrl.navigateBack(['/']);
  })
  .catch(err => {
    this.showToast('Error al de enviar correo de restauracion, el email no existe.');
    this.newCenterForm.reset();
  });
}

  showToast(msg) {
    this.toastCtrl.create({
      message: msg,
      duration: 3000,
      position: 'middle',
      color: 'success'
    }).then(toast => toast.present());
  }
}
