import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ModalBannerPage } from './modal-banner/modal-banner.page'
import { InfoBannerService } from '../../../core/services/info-banner.service';
import { InfoBanner } from '../../../core/models/info-banner.model';

@Component({
  selector: 'app-banner',
  templateUrl: './banner.page.html',
  styleUrls: ['./banner.page.scss'],
})

/**
   * User Story Id: M2NC5
   * Allows the BannerPage to be available for imports
   * @param  
   * @returns 
   */
export class BannerPage implements OnInit {

  banners: InfoBanner[];
  actualPage = 1;

  /**
   * User Story Id: M2NC5
   * Allows to inject services to the model, searches for all available banners and presents the BannerModal
   * @param  {ModalController} modalController
   * @param  {IonRouterOutlet} routerOutlet
   * @returns 
   */
  constructor(
    private modalController: ModalController,
    private bannerService: InfoBannerService,
  ) {
    this.bannerService.getAllInfoBanners().then( data => {
      this.banners = data;
    });
  }

  /**
   * User Story Id: M2NC5
   * Fuction that is executed when the page instantiated
   * @param  
   * @returns 
   */
  ngOnInit() {
  }

  /**
   * User Story Id: M2NC5
   * Fuction that is executed for presenting the modal, searching for the modal usign the BannerService
   * @param  
   * @returns 
   */
  async seeDetail(detailTitle: string, detailDescription: string, detailImage: string, detailDate: string){
    const modal = await this.modalController.create({
      component: ModalBannerPage,
      swipeToClose: true,
      componentProps: {
        title: detailTitle,
        description: detailDescription,
        url: detailImage,
        date: detailDate
      }
    });
    return modal.present();
  }

  /**
   * User Story Id: M2NC5
   * Fuction that is executed for autoplaying the slider
   * @param  
   * @returns 
   */
  slidesDidLoad(BannerSlider){
    BannerSlider.startAutoplay();
  }

}
