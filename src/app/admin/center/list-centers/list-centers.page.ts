import { Component, OnInit } from '@angular/core';
import { Place } from 'src/app/core/models/lugar.model';
import { LugaresService } from 'src/app/core/services/lugares.service';

import { Observable } from 'rxjs';

@Component({
  selector: 'app-list-centers',
  templateUrl: './list-centers.page.html',
  styleUrls: ['./list-centers.page.scss'],
})
export class ListCentersPage implements OnInit {

  places : any [];

  constructor(private placesService: LugaresService) { 
  }

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.placesService.getAllPlaces().then( data => { this.places=data});
  }
}
