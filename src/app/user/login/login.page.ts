import { AuthService } from './../../core/services/auth.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import {AngularFireAuth} from '@angular/fire/auth';
import { auth } from 'firebase/app'; 
import { AlertController } from '@ionic/angular';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})

/** Login Class  */
export class LoginPage implements OnInit {
  public email: string;
  public password: string;
  // eslint-disable-next-line require-jsdoc
  constructor(public afAuth: AngularFireAuth,
              private router: Router, 
              private authService: AuthService, 
              public alertController: AlertController) { }

  // eslint-disable-next-line require-jsdoc
  ngOnInit() {
  }
  /**
   * Method that calls auth service so that the user can login to the app with email and password
   * @returns void
   */
  onLogin(): void {
    this.authService.loginEmailUser(this.email, this.password)
        .then( () => {
          this.router.navigate(['user/places-searcher-page']);
        } ).catch (err => {this.isAnError(err);});
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
        }).catch (err => console.log(err));
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
  async isAnError(error) {
    if('auth/invalid-email' == error.code) {
      const alert = await this.alertController.create({
        header: 'Error',
        message: 'Escribe un email correcto.',
        buttons: ['OK']
      });
      await alert.present();
    } else if ('auth/argument-error' == error.code) {
      const alert = await this.alertController.create({
        header: 'Error',
        message: 'Escribir email y contraseña porfavor.',
        buttons: ['OK']
      });
      await alert.present();
    } else if ('auth/user-not-found' == error.code || 'auth/wrong-password' == error.code) {
      const alert = await this.alertController.create({
        header: 'Error',
        message: 'Contraseña o Usuario erroneos.',
        buttons: ['OK']
      });
      await alert.present();
    }
  }
}
