/* eslint-disable require-jsdoc */
import { Component, OnInit } from '@angular/core';
import { NavController, ToastController } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from 'src/app/core/services/auth.service';
import { DelegationService } from 'src/app/core/services/delegation.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
/*
  *     Register
  */
export class RegisterPage implements OnInit {
  delegations:any[];
  get f() { return this.newCenterForm.controls; }
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
  /**
   * Getter
   */
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
      { type: 'required', message: 'La confirmacion de contraseña es requerida' },
      { type: 'mustMatch', message: 'La contraseña de confirmacion debe coincidir con la contraseña' }

    ],
    
    delegation_id: [
      { type: 'required', message: 'Es necesario elegir una delegación'}
    ],
    
  };

  newCenterForm = this.formBuilder.group({
    alias: ['', [Validators.required, Validators.maxLength(100)]],
    email: ['', [Validators.required, Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')]],
    password: ['', [Validators.required, Validators.minLength(8)]],
    confirmPassword: ['', Validators.required],
    delegation_id: ['', Validators.required], 
  },{
    validator: this.mustMatch('password', 'confirmPassword')
  });

  constructor(
    private authService: AuthService,
    private navCtrl: NavController,
    public formBuilder: FormBuilder,
    private toastCtrl: ToastController,
    private delegationService: DelegationService,
  ) { }

  ngOnInit() {
    this.delegationService.getDelegations().then(delegation => {
      this.delegations = delegation;
    });
  }
  public submit() {
    this.authService.registerUser(this.newCenterForm.value).then(() => {
    
      this.showToast('Usuario fue registrado');
      this.newCenterForm.reset();
    
      this.navCtrl.navigateBack(['/']);
    })
        .catch(err => {
          this.showToast('Error el usuario con este correo ya existe');
          console.log(err);
          this.newCenterForm.reset();
        });
    return
  }

  showToast(msg: string) {
    this.toastCtrl.create({
      message: msg,
      duration: 3000,
      position: 'middle',
      color: 'success'
    }).then(toast => toast.present());
  }
  /**
   * @param  {string} controlName
   * @param  {string} matchingControlName
   */
  mustMatch(controlName: string, matchingControlName: string) {
    return (formGroup: FormGroup) => {
      const control = formGroup.controls[controlName];
      const matchingControl = formGroup.controls[matchingControlName];

      if (matchingControl.errors && !matchingControl.errors.mustMatch) {
        // return if another validator has already found an error on the matchingControl
        return;
      }

      // set error on matchingControl if validation fails
      if (control.value !== matchingControl.value) {
        matchingControl.setErrors({ mustMatch: true });
      } else {
        matchingControl.setErrors(null);
      }
    }
  }
}
