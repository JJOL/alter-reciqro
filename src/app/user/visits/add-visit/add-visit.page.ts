import { Component, OnInit } from '@angular/core';
import { QRCodeEvent } from 'src/app/shared/qrscanner/qrscanner.component';
import { VisitsService } from '../visits.service';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-add-visit',
  templateUrl: './add-visit.page.html',
  styleUrls: ['./add-visit.page.scss'],
})
export class AddVisitPage implements OnInit {

  canReadVisit: boolean;

  constructor(
    private visitsService: VisitsService,
    private navCtrl: NavController
    ) {
      this.canReadVisit = true;
    }

  ngOnInit() {
  }

  onReadCode(event: QRCodeEvent) {

    if (this.canReadVisit) {
      this.canReadVisit = false;

      this.visitsService.registerQRVisit(event.url)
      .then(() => {
        // Navigate Back;
        this.navCtrl.navigateBack('/user/visits');
      })
      .catch(() => {
        this.canReadVisit = true;
      })
    }
    
    
    

  }

}
