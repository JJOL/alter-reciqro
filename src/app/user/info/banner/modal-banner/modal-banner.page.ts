import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';


@Component({
  selector: 'app-modal-banner',
  templateUrl: './modal-banner.page.html',
  styleUrls: ['./modal-banner.page.scss'],
})

/**
   * User Story Id: M2NC5
   * Allows the ModalBannerPage to be available for imports
   * @param  
   * @returns 
   */
export class ModalBannerPage implements OnInit {

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
   * User Story Id: M2NC5
   * Fuction that is executed when the page instantiated
   * @param  
   * @returns 
   */
  ngOnInit() {
  }

  /**
   * User Story Id: M2NC5
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
