import { AlertController, ToastController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import { InfoBannerService } from 'src/app/core/services/info-banner.service';
import { InfoBanner } from 'src/app/core/models/info-banner.model';

@Component({
  selector: 'app-info-banners',
  templateUrl: './info-banners.page.html',
  styleUrls: ['./info-banners.page.scss'],
})
/**
 * Information Banners
 */
export class InfoBannersPage implements OnInit {

  infoBanners: InfoBanner[]

  // eslint-disable-next-line require-jsdoc
  constructor(
    private infoBannerService: InfoBannerService,
    private alertCtrl: AlertController,
    private toastCtrl: ToastController
  ) { }
  /**
   */
  ngOnInit() {
  }
  /**
   */
  onDeleteInfoBanner(infoBannerId,title){
    this.alertCtrl.create ({
      header: 'Mensaje de Confirmación',
      message: '¿De verdad quieres eliminar la ficha "' + title + '"?"',
      buttons: [{
        text: 'Cancelar',
        role: 'cancel'},
      {
        text: 'Borrar',
        handler: () => {
          this.infoBannerService.deleteInfoBannersByID(infoBannerId).then(
              () => {
                this.showToast('Se eliminó de manera correcta');
                this.infoBannerService.getAllInfoBanners()
                    .then(infoBanners => {
                      this.infoBanners = infoBanners;
                    });
              }
          ).catch( () => {
            this.showToastWrong('Error al crear la ficha informativa');
          });
        }
      }]
    }).then(alertEl => {
      alertEl.present();
    });
  }
  /**
   * User Story ID: M4NG8
   * Function for showing the toast to the user.
   * @param  {} msg
   */
  public showToast(msg) {
    this.toastCtrl.create({
      message: msg,
      duration: 2000,
      position: 'middle',
      color: 'success'
    }).then(toast => toast.present());
  }
  /**
   * User Story ID: M4NG8
   * Function for showing the toast to the user.
   * @param  {} msg
   */
  public showToastWrong(msg) {
    this.toastCtrl.create({
      message: msg,
      duration: 2000,
      position: 'middle',
      color: 'danger'
    }).then(toast => toast.present());
  }
  /**
   * Listen to check if there is a change
   */
  ionViewWillEnter() {
    this.infoBannerService.getAllInfoBanners()
        .then(infoBanners => {
          this.infoBanners = infoBanners;
        });
  }
}
