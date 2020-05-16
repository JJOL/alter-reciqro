import { AuthService } from './core/services/auth.service';
import { Component, OnInit } from '@angular/core';

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
export class AppComponent implements OnInit{
  isLogged: boolean;
  admin: boolean;
  staff: boolean;
  user: boolean;

  // eslint-disable-next-line require-jsdoc
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private authService: AuthService
  ) {
    this.authService.isUserLoggedIn.asObservable().subscribe(value => {
      this.isLogged = value;
    });
    this.authService.userRoles.asObservable().subscribe(roles => {
      this.admin = roles [1];
      this.staff = roles [2];
      this.user = roles[3];
    });
    this.initializeApp();
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
   * Required by Angular.
   */
  ngOnInit() {
  }

  /**
   * User Story ID: M4NG3
   * Logouts the current users
   */
  onLogout() {
    this.authService.logoutUser();
  }
}
