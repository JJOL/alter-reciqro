import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-splashscreen',
  templateUrl: './splashscreen.page.html',
  styleUrls: ['./splashscreen.page.scss'],
})

/**
 * Exporting the class so it is externally accessible.
 */
export class SplashscreenPage implements OnInit {
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
