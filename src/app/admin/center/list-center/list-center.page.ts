import { Component, OnInit } from '@angular/core';
import { Place } from 'src/app/core/models/place.model';
import { PlacesService } from 'src/app/core/services/places.service';

import { Observable } from 'rxjs';

@Component({
  selector: 'app-list-center',
  templateUrl: './list-center.page.html',
  styleUrls: ['./list-center.page.scss'],
})
export class ListCenterPage implements OnInit {

  places : any [];

  constructor(private placesService: PlacesService) { 
  }

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.placesService.getAllPlaces().then( data => { this.places=data});
  }
}
