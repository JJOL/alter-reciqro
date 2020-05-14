import { map } from 'rxjs/operators';

import { AuthService } from './../../core/services/auth.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import {AngularFireAuth} from '@angular/fire/auth';
import { ToastController } from '@ionic/angular';
import { FormBuilder, Validators } from '@angular/forms';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})

/** Login Class  */
export class LoginPage implements OnInit {
  
  rolesaux: string[];
  isLogged= false;
  /**
   */
  get f() { return this.newCenterForm.controls; }
  /**
   */
  get email() {
    return this.newCenterForm.get('email');
  }
  /**
   */
  get password() {
    return this.newCenterForm.get('password');
  }

  public errorMessages = {


    email: [
      { type: 'required', message: 'Email es requerido' },
      { type: 'pattern', message: 'El formato de email no es correcto'}
    ],
    password: [
      { type: 'required', message: 'Contraseña es requerida' },

    ]

  };

  newCenterForm = this.formBuilder.group({

    email: ['', [Validators.required, Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')]],
    password: ['', [Validators.required]],

  });

  // eslint-disable-next-line require-jsdoc
  constructor(public afAuth: AngularFireAuth,
              private router: Router,
              private authService: AuthService,
              public formBuilder: FormBuilder,
              private toastCtrl: ToastController) { }

  // eslint-disable-next-line require-jsdoc
  ngOnInit() {
  }
  /**
   * Method that calls auth service so that the user can login to the app with email and password
   * @returns void
   */
  public submit() {
    this.authService.loginEmailUser(this.newCenterForm.value.email, this.newCenterForm.value.password)
        .then( () => {
          
          setTimeout(()=>{
            this.adminRedirection()
          },1000)
        } ).catch (() => {
          this.showToast('Contraseña o Usuario Incorrecto','danger')
          this.newCenterForm.reset;
        });
  }
  /**
   * Method that calls auth service so that the user can login to the app with google
   * @returns void
   */
  onLoginGoogle(): void{
    this.authService.loginGoogleUser()
        .then(() => {
          this.router.navigate(['user/places-searcher-page']);
        // eslint-disable-next-line no-console
        }).catch (err => {
          console.log(err)
          this.isAnError(err)
        });
  }
  /**
   * Method that calls auth service so that the user can logout and end the session
   */
  onLogout() {
    this.authService.logoutUser();
  }
  /**
   * Method used for handling errors
   * @param  {} error
   */
  isAnError(error) {
    if ('auth/user-not-found' === error.code || 'auth/wrong-password' === error.code) {
      this.showToast('Error, contraseña o usuario incorrecto','danger');

    }
  }
  /**
   * Crear mensaje en forma de Toast
   * @param  {string} msg
   *
   */
  showToast(msg: string, color: string) {
    this.toastCtrl.create({
      message: msg,
      duration: 3000,
      position: 'middle',
      color: color
    }).then(toast => toast.present());
  }
  /**
   */
  ionViewDidEnter(){
    this.authService.getCurrentUser()
        .then(user => {
          if (user) {
            this.router.navigate(['user/places-searcher-page']);
          }
        }).catch((err) => {
          return err;
        });
  }
  /**
   * When enter is pressed
   * @param  {} event
   */
  keyDownFunction(event) {
    if (event.keyCode === 13) {
      this.submit()
      // rest of your code
    }
  }
  /**
   */
  adminRedirection(){
    this.authService.isUserLoggedIn.asObservable().subscribe(value => {
      this.isLogged = value;
    });
    this.authService.userRoles.asObservable().subscribe(roles => {
      
      this.rolesaux = roles;
      
    });

    if(this.isLogged){
      console.log(this.rolesaux)
      console.log(this.rolesaux.includes('admin'));
      if(this.rolesaux.includes('admin') || this.rolesaux.includes('staff')){
        this.router.navigate(['admin/center']);
      }else if(this.rolesaux.includes('user')){
        
        this.router.navigate(['user/places-searcher-page']);
      }
    }
    
  }

}
