import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { InfoBannerService } from 'src/app/core/services/info-banner.service';
import { BannerPopUpPage } from './banner-pop-up/banner-pop-up.page'
import { InfoBanner } from '../../core/models/info-banner.model';

@Component({
  selector: 'app-info',
  templateUrl: './info.page.html',
  styleUrls: ['./info.page.scss'],
})

/**
 * Information page class, provides methods for Angular loading.
*/
export class InfoPage implements OnInit {

  banners: InfoBanner[];

  /**
   * User Story Id: M2NC4
   * Allows to inject services to the model and presents the BannerModal
   * @param  {ModalController} modalController
   * @param  {IonRouterOutlet} routerOutlet
   * @returns 
   */
  constructor(
    private modalController: ModalController,
    private bannerService: InfoBannerService,
  ) {
    let date = new Date().toISOString();
    let argDate: string[];
    argDate = date.split('T');
    // eslint-disable-next-line @typescript-eslint/no-magic-numbers
    this.presentModal(argDate[0]);
  }


  /**
   * Method not used but required by Angular.
   */
  ngOnInit() {
  }

  /**
   * User Story Id: M2NC4
   * Presents the modal, searching data for the modal consuming the BannerService
   * checks if there is some banner with the current date otherwise shows a random one
   * @param  
   * @returns 
   */
  async presentModal(date: string) {
    await this.bannerService.getBannerofDay(date).then( async data => {
      let bannersOfDay: InfoBanner[] = data;
      // eslint-disable-next-line @typescript-eslint/no-magic-numbers
      if(bannersOfDay.length > 0){
        if(bannersOfDay[0] !== undefined){
          const modal = await this.modalController.create({
            component: BannerPopUpPage,
            swipeToClose: true,
            componentProps: {
              // eslint-disable-next-line @typescript-eslint/no-magic-numbers
              title: bannersOfDay[0].title,
              // eslint-disable-next-line @typescript-eslint/no-magic-numbers
              description: bannersOfDay[0].description,
              // eslint-disable-next-line @typescript-eslint/no-magic-numbers
              url: bannersOfDay[0].image_url,
              // eslint-disable-next-line @typescript-eslint/no-magic-numbers
              date: bannersOfDay[0].date
            }
          });
          return modal.present();
        }
      }else{
        await this.bannerService.getAllInfoBanners().then( async data => {
          this.banners = data;
          let size = this.banners.length;
          // eslint-disable-next-line @typescript-eslint/no-magic-numbers
          let random = Math.floor(Math.random() * 10) % size;
          if(this.banners[random] != undefined){
            const modal = await this.modalController.create({
              component: BannerPopUpPage,
              swipeToClose: true,
              componentProps: {
                title: this.banners[random].title,
                description: this.banners[random].description,
                url: this.banners[random].image_url,
                date: this.banners[random].date
              }
            });
            return modal.present();
          }
        });
      }
    });
  }

}
