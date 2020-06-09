import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-help',
  templateUrl: './help.page.html',
  styleUrls: ['./help.page.scss'],
})

/**
 * Exporting the class so it is externally accessible.
 */
export class HelpPage{

  trustedVideoUrl: SafeResourceUrl;
  arrayOfVideos = [{vid_link:'https://www.youtube.com/embed/PefnZ-ty1ng'}]

  /**
   * User Story ID: M1NC1
   * Provides the user with help to use the map.
   * @param  {ModalController} modalCtrl
   * @returns 
   */
  constructor(
    private modalCtrl: ModalController,
    private domSanitizer: DomSanitizer 
  ) { }

  /**
   * User Story ID: M1NC1
   * Fuction that is executed when the page instantiated
   * @param  
   * @returns 
   */
  ionViewWillEnter() {
    for(let i of this.arrayOfVideos){
      this.trustedVideoUrl = this.domSanitizer.bypassSecurityTrustResourceUrl(i.vid_link);
    }
  }

  /**
   * User Story ID: M1NC1
   * Fuction that is executed for dismissing the modal
   * @param  
   * @returns 
   */
  dismiss() {
    this.modalCtrl.dismiss({
      dismissed: true
    });
  }


}
