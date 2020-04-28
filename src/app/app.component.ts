import { AuthService } from './core/services/auth.service';
import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
/**
 * Componente principal
 */
export class AppComponent {
  private isLogged: boolean;
  private admin: boolean;
  private staff: boolean;
  private user: boolean;

  // eslint-disable-next-line require-jsdoc
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private authService: AuthService
  ) {
    this.initializeApp();
  }
  /**
   * Salir de la sesion
   */
  onLogout() {
    this.authService.logoutUser();
    let roles =  this.authService.getRolesandSession();
    this.isLogged = roles[0];
    this.admin = roles [1];
    this.staff = roles [2];
    this.user = roles[3];
  }
  /**
   * Method to initialize
   */
  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  /**
   *  Loads somtehing
   */
  ngOnInit() {
    this.authService.isUserLoggedIn.asObservable().subscribe(value => {
      this.isLogged = value;
      console.log("aqui esta cambiando",this.authService.isUserLoggedIn.value);

      /*this.authService.userRoles.asObservable().subscribe(roles => {
        console.log("entro a los roles");
        this.admin = roles [1];
        this.staff = roles [2];
        this.user = roles[3];
      });*/
    });
  }



}
