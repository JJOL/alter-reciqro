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
 * Page incharge of Information Banners
 */
export class InfoBannersPage implements OnInit {

  infoBanners: InfoBanner[];
  listInfoBanners: InfoBanner[];
  actualPage = 1;

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
   * User Story Id: M2NG6
   * Method that calls the service infoBannerService to delete an existing information banner, asking first if you want to delete it
   */
  onDeleteInfoBanner(infoBannerId,title){
    this.alertCtrl.create ({
      header: 'Mensaje de Confirmación',
      message: '¿De verdad quieres eliminar el banner "' + title + '"?"',
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
                      this.listInfoBanners = this.listInfoBanners.filter( infoBanner => {
                        return infoBanner.id !== infoBannerId;
                      });
                    });
              }
          ).catch( () => {
            this.showToastWrong('Error al crear el banner');
          });
        }
      }]
    }).then(alertEl => {
      alertEl.present();
    });
  }
  /**
   * User Story ID: M4NG8
   * Function for showing the success message toast to the user.
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
   * Function for showing the error message toast to the user.
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
   * Listen to check if there is a change in the view considering all the infobanners
   */
  ionViewWillEnter() {
    this.infoBannerService.getAllInfoBanners()
        .then(infoBanners => {
          this.infoBanners = infoBanners;
          this.listInfoBanners = this.infoBanners
        });
  }

  /**
   * User Story ID: M4NG8
   * This function retrieves all waste types that have the name searched
   */
  searchByName(event){
    0 === event.detail.value.length ? this.listInfoBanners = this.infoBanners:
    this.listInfoBanners = this.infoBanners.filter( infoBanner => {
      return infoBanner.title.toLowerCase().indexOf(event.detail.value.toLowerCase()) !== -1;
    });
  }
}
