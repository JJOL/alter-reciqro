import { Component, OnInit } from '@angular/core';
import { VisitsService } from './visits.service';

@Component({
  selector: 'app-visits',
  templateUrl: './visits.page.html',
  styleUrls: ['./visits.page.scss'],
})
export class VisitsPage implements OnInit {

  visits = [];

  constructor(
    private visitsService: VisitsService
  ) { }

  ngOnInit() {
    
  }

  ionViewWillEnter() {
    this.visitsService.getAllVisitsForUser()
    .then(visits => {
      console.log(visits);
      
      this.visits = visits;
    });
  }

}
