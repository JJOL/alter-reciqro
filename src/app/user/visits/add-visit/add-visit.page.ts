import { Component, OnInit } from '@angular/core';
import { QRCodeEvent } from 'src/app/shared/qrscanner/qrscanner.component';
import { VisitsService } from '../visits.service';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-add-visit',
  templateUrl: './add-visit.page.html',
  styleUrls: ['./add-visit.page.scss'],
})
/**
 * AddVisitPage
 * Description: Page for adding a new visit by using the QRScannerComponent
 */
export class AddVisitPage {

  // Control Flag to avoid scanning while processing a current scan
  canReadVisit: boolean;

  constructor(
    private visitsService: VisitsService,
    private navCtrl: NavController
    ) {
      this.canReadVisit = true;
    }
  /**
   * User Story ID: M1NG6
   * Description: Handler Function when a qr code is detected to attemp to register.
   * @param  {QRCodeEvent} event
   */
  onReadCode(event: QRCodeEvent) {

    if (this.canReadVisit) {
      this.canReadVisit = false;

      this.visitsService.registerQRVisit(event.url)
      .then(() => {
        this.navCtrl.navigateBack('/user/visits');
      })
      .catch(() => {
        this.canReadVisit = true;
      })
    }
    
  }

}
