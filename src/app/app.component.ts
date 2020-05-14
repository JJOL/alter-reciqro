import { AuthService } from './core/services/auth.service';
import { Component, OnInit } from '@angular/core';

import { Platform, ModalController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { SplashscreenPage } from './user/splashscreen/splashscreen.page';

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
    private authService: AuthService,
    private modalController: ModalController
  ) {
    this.authService.isUserLoggedIn.asObservable().subscribe(value => {
      this.isLogged = value;
    });
    if (this.isLogged) {
      this.authService.userRoles.asObservable().subscribe(roles => {
        this.admin = roles [1];
        this.staff = roles [2];
        this.user = roles[3];
      });
    }
    this.initializeApp();
  }
  /**
   * Method to initialize
   */
  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.presentModal();
      this.splashScreen.hide();
      setTimeout(() => {
        this.modalController.dismiss();
      // eslint-disable-next-line @typescript-eslint/no-magic-numbers
      }, 2000);
    });
  }
  /**
   */
  ngOnInit() {
  }

  /**
   */
  onLogout() {
    this.authService.logoutUser();
  }

  /**
   * User Story Id: M2NC4
   * Fuction that is executed for presenting the modal, searching for the modal usign the BannerService
   * @param  
   * @returns 
   */
  async presentModal() {
    const modal = await this.modalController.create({
      component: SplashscreenPage,
      swipeToClose: true,
    });
    return modal.present();
  }


}
