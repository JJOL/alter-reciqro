import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ModalBannerPage } from './modal-banner/modal-banner.page'
//import { IonRouterOutlet } from '@ionic/angular';
import { InfoBannerService } from '../../../core/services/info-banner.service';
import { InfoBanner } from '../../../core/models/info-banner.model';

@Component({
  selector: 'app-banner',
  templateUrl: './banner.page.html',
  styleUrls: ['./banner.page.scss'],
})

/**
   * User Story Id: M2NC4
   * Allows the BannerPage to be available for imports
   * @param  
   * @returns 
   */
export class BannerPage implements OnInit {

  banners: InfoBanner[];

  /**
   * User Story Id: M2NC4
   * Allows to inject services to the model, searches for all available banners and presents the BannerModal
   * @param  {ModalController} modalController
   * @param  {IonRouterOutlet} routerOutlet
   * @returns 
   */
  constructor(
    private modalController: ModalController,
    //private routerOutlet: IonRouterOutlet,
    private bannerService: InfoBannerService,
  ) {
    this.bannerService.getAllInfoBanners().then( data => {
      this.banners = data;
    });
    this.presentModal();
  }

  /**
   * User Story Id: M2NC4
   * Fuction that is executed when the page instantiated
   * @param  
   * @returns 
   */
  ngOnInit() {
  }

  /**
   * User Story Id: M2NC4
   * Fuction that is executed for presenting the modal, searching for the modal usign the BannerService
   * @param  
   * @returns 
   */
  async presentModal() {
    await this.bannerService.getAllInfoBanners().then( async data => {
      this.banners = data;
      let size = this.banners.length;
      // eslint-disable-next-line @typescript-eslint/no-magic-numbers
      let random = Math.floor(Math.random() * 10) % size;
      const modal = await this.modalController.create({
        component: ModalBannerPage,
        swipeToClose: true,
        //presentingElement: this.routerOutlet.nativeEl,
        componentProps: {
          title: this.banners[random].title,
          description: this.banners[random].description,
          url: this.banners[random].image_url,
          date: this.banners[random].date
        }
      });
      return modal.present();
    });
  }

}
