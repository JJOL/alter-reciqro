import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-aviso-privacidad',
  templateUrl: './aviso-privacidad.page.html',
  styleUrls: ['./aviso-privacidad.page.scss'],
})

/**
   * Allows the AvisoPrivacidadPage to be available for imports
   * @param  
   * @returns 
   */
export class AvisoPrivacidadPage implements OnInit {

  /**
   * Allows to inject services to the model
   * @param  {ModalController} modalCtrl
   * @returns 
   */
  constructor(
    private modalCtrl: ModalController
  ) { }

  /**
   * Function that is executed when the page instantiated
   * @param  
   * @returns 
   */
  ngOnInit() {
  }

  /**
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
