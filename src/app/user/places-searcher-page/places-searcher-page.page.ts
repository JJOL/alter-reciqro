import { Component, OnInit } from '@angular/core';
import { LugaresService } from 'src/app/core/services/lugares.service';
import { Place } from '../../core/models/lugar.model';

@Component({
  selector: 'app-places-searcher-page',
  templateUrl: './places-searcher-page.page.html',
  styleUrls: ['./places-searcher-page.page.scss'],
})
export class PlacesSearcherPagePage implements OnInit {

  places: Place[];

  constructor(
    private placesService: LugaresService
  ) { }

  async ngOnInit() {
    this.places = await this.placesService.getAllPlaces();
    console.log(this.places);
    
  }

}
