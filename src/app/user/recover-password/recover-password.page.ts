import { Component, OnInit } from '@angular/core';
import { AlertController, NavController, ToastController } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from 'src/app/core/services/auth.service';

import * as firebase from 'firebase/app';
@Component({
  selector: 'app-recover-password',
  templateUrl: './recover-password.page.html',
  styleUrls: ['./recover-password.page.scss'],
})
export class RecoverPasswordPage implements OnInit {
  updateBookingForm: FormGroup;
  get email() {
    return this.newCenterForm.get('email');
  }

  public errorMessages = {
    email: [
      { type: 'required', message: 'Email es requerido' },
      { type: 'patter', message: 'La entrada debe estar en formato de email'}
    ]
   
  };

  newCenterForm = this.formBuilder.group({
    
    email: ['', [Validators.required, Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')]],
  
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
    
    

    this.authService.sendPasswordResetEmail(this.newCenterForm.value.email)
        .then(id => {
          // use id
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
      duration: 2000,
      position: 'middle',
      color: 'success'
    }).then(toast => toast.present());
  }
}
