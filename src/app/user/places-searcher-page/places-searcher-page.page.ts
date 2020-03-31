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
    

    setTimeout(() => {
      console.log('Mira pendeje');
      
      this.places = [{
        name: 'Default',
        address: 'das',
        description: 'das',
        id: 'das',
        location: {
          lat: 20,
          lng: -100
        },
        photo: 'dsada',
        places_type: {
          description: 'dsa',
          id: 'dsa',
          name: 'dsa' 
        },
        postal_code: 54634,
        qr_code: 'dasd'
      }]
    }, 5000);
  }

}
