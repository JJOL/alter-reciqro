import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-banner-pop-up',
  templateUrl: './banner-pop-up.page.html',
  styleUrls: ['./banner-pop-up.page.scss'],
})
/**
 * Exporting the class so it is externally accessible.
 */
export class BannerPopUpPage implements OnInit {

  @Input() title: string;
  @Input() description: string;
  @Input() url: string;
  @Input() date: string;
  
  /**
   * User Story Id: M2NC5
   * Allows to inject services to the model
   * @param  {ModalController} modalCtrl
   * @returns 
   */
  constructor(
    private modalCtrl: ModalController
  ) {

  }

  /**
   * User Story ID: M2NC4,M2NC5
   * Fuction that is executed when the page instantiated
   * @param  
   * @returns 
   */
  ngOnInit() {
  }

  /**
   * User Story Id: M2NC4,M2NC5
   * Fuction that is executed for dismissing the modal
   * @param  
   * @returns 
   */
  dismiss() {
    // using the injected ModalController this page
    // can "dismiss" itself and optionally pass back data
    this.modalCtrl.dismiss({
      dismissed: true
    });
  }

}
