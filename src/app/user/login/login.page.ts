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

/** Clase loginpage la cual se usa para logear al usuario. */ 
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
   * Metodo onlogin
   * Manda a llamar el servicio de auth para poder accesar a sus metodos
   * para ejecutar el login normal con password y contrasena
   * @returns void
   */
  onLogin(): void {
    // eslint-disable-next-line no-console
    console.log(this.email,this.password);
    this.authService.loginEmailUser(this.email, this.password)
        .then( () => {
          this.router.navigate(['user/places-searcher-page']);
        // eslint-disable-next-line no-console
        } ).catch (err => {this.isAnError(err);});
  }
  /**
   * Metodo on logingoogle, que llama a authservice para ejecutar el inicio con google
   * @returns void
   */
  onLoginGoogle(): void{
    //console.log("Entro a google");
    //this.afAuth.auth.signInWithPopup(new auth.GoogleAuthProvider());
    this.authService.loginGoogleUser()
        .then(() => {
          this.router.navigate(['user/places-searcher-page']);
        // eslint-disable-next-line no-console
        }).catch (err => console.log(err));
  }
  /**
   * Metodo on logout, madna a llamar de auth service el termianr la sesion
   */
  onLogout() {
    //console.log("Salio a google");
    this.authService.logoutUser();
  }
  /**
   * Metodo isAnError:
   * toma como parametro un error
   * @param  {} error
   * del cual compara el tipo de error y despliega una alerta
   */
  async isAnError(error) {
    if('auth/invalid-email' ==error.code){
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
    } else if ('auth/user-not-found' == error.code) {
      const alert = await this.alertController.create({
        header: 'Error',
        message: 'Contraseña o Usuario erroneos.',
        buttons: ['OK']
      });
      await alert.present();
    } else if ('auth/wrong-password' == error.code) {
      const alert = await this.alertController.create({
        header: 'Error',
        message: 'Contraseña o Usuario erroneos.',
        buttons: ['OK']
      });
      await alert.present();
    }
  }
}
