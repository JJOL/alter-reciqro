import { Component, OnInit } from '@angular/core';
import { NavController, ToastController } from '@ionic/angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from 'src/app/core/services/auth.service';
import { DelegationService } from 'src/app/core/services/delegation.service';


const MIN_LENGTH_PASSWORD = 8
const MAX_LENGTH_ALIAS = 100


@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
/**
 * User Story ID: M4NC1
 * RegisterPage page component
 */
export class RegisterPage implements OnInit {
  delegations:any[];

  public acceptedPrivacyPolicy = false

  /**
   * User Story ID: M4NC1
   * Get controls of the form
   */
  get f() { return this.newCenterForm.controls; }
  
  /**
   * User Story ID: M4NC1
   * Get password
   */
  get email() {
    return this.newCenterForm.get('email');
  }
  /**
   * User Story ID: M4NC1
   * Get password
   */
  get password() {
    return this.newCenterForm.get('password');
  }

  /**
   * User Story ID: M4NC1
   * Get confirmpassword
   */
  get confirmPassword() {
    return this.newCenterForm.get('confirmPassword');
  }
  
  /**
   * User Story ID: M4NC1
   * Get alias
   */
  get alias() {
    return this.newCenterForm.get('alias');
  }

  /**
   * User Story ID: M4NC1
   * Get delegation id 
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

    privacy_policy: [
      { type: 'required', message: 'Es necesario leer y aceptar la política de privacidad'}
    ]
    
  };

  newCenterForm = this.formBuilder.group({
    alias: ['', [Validators.required, Validators.maxLength(MAX_LENGTH_ALIAS)]],
    email: ['', [Validators.required, Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')]],
    password: ['', [Validators.required, Validators.minLength(MIN_LENGTH_PASSWORD)]],
    confirmPassword: ['', Validators.required],
    delegation_id: ['', Validators.required], 
    privacy_policy: ['', Validators.required]
  },{
    validator: this.mustMatch('password', 'confirmPassword')
  });

  /**
   * @param  {AuthService} privateauthService
   * @param  {NavController} privatenavCtrl
   * @param  {FormBuilder} publicformBuilder
   * @param  {ToastController} privatetoastCtrl
   * @param  {DelegationService} privatedelegationService
   * Constructor for register page ts
   * User Story ID: M4NC1
   */
  constructor(
    private authService: AuthService,
    private navCtrl: NavController,
    public formBuilder: FormBuilder,
    private toastCtrl: ToastController,
    private delegationService: DelegationService,
  ) { }

  /**
   * User Story ID: M4NC1
   * Loads the delegation catalog 
   */
  ngOnInit() {
    this.delegationService.getDelegations().then(delegation => {
      this.delegations = delegation;
    });
  }

  /**
   * User Story ID: 
   * validates privacy policy is accepted
   */
  hasReadPrivacyPolicy () {
    if (true === this.acceptedPrivacyPolicy) {
      this.acceptedPrivacyPolicy = false;
    } else {
      this.acceptedPrivacyPolicy = true;
    }
  }

  /**
   * User Story ID: M4NC1
   * Submit the information from the form to register the user using auth service methods
   */
  public submit() {
    this.authService.registerUser(this.newCenterForm.value).then(() => {
    
      this.showToast('Usuario fue registrado');
      this.newCenterForm.reset();
    
      this.navCtrl.navigateBack(['/']);
    })
        .catch(err => {
          this.showToast('Error el usuario con este correo ya existe');
          
          this.newCenterForm.reset();
        });
    return
  }
  
  /**
   * User Story ID: M4NC1
   * Creates and shows a custom toast 
   * @param  {string} msg
   */
  showToast(msg: string) {
    this.toastCtrl.create({
      message: msg,
      duration: 3000,
      position: 'middle',
      color: 'success'
    }).then(toast => toast.present());
  }
  /**
   * User Story ID: M4NC1
   * @param  {string} controlName
   * @param  {string} matchingControlName
   * Validates if the password and the confirm password are the same
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
