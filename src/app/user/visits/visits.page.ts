import { Component, OnInit } from '@angular/core';
import { VisitsService } from './visits.service';

@Component({
  selector: 'app-visits',
  templateUrl: './visits.page.html',
  styleUrls: ['./visits.page.scss'],
})
/**
 * VisitsPage
 * User Story ID: M1NG6
 * Description: Class to hold user visits information to centers
 */
export class VisitsPage {

  visits = [];

  constructor(
    private visitsService: VisitsService
  ) { }

  /**
   * User Story ID: M1NG6
    * Description: Load visits for the current user.
   */
  ionViewWillEnter() {
    this.visitsService.getAllVisitsForUser()
        .then(visits => {    
          this.visits = visits;
        });
  }

}
