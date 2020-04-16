import { Component, OnInit } from '@angular/core';
import { PlacesService } from 'src/app/core/services/places.service';

@Component({
  selector: 'app-place-type',
  templateUrl: './place-type.page.html',
  styleUrls: ['./place-type.page.scss'],
})
export class PlaceTypePage implements OnInit {

  placeTypes: any [];

  constructor(private placesService: PlacesService) {
  }

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.placesService.allPlaceTypes().then( data => { this.placeTypes = data; });
  }
}
