import { Component, OnInit } from '@angular/core';
import { PlacesService } from 'src/app/core/services/places.service';


@Component({
  selector: 'app-list-center',
  templateUrl: './list-center.page.html',
  styleUrls: ['./list-center.page.scss'],
})
/**
 * Exporting ListCenterPage class so it is externally accessible.
 */
export class ListCenterPage implements OnInit {

  places: any [];

  /**
   * User Story ID: M1NG4
   * This function retrieves all places from the service when page loads
   */
  constructor(private placesService: PlacesService) {
  }

  /**
   * User Story ID: M1NG4
   * This function retrieves all places from the service when page loads
   */
  ngOnInit() {
  }

  /**
   * User Story ID: M1NG4
   * This function retrieves all places from the service when page loads
   */
  ionViewWillEnter() {
    this.placesService.getAllPlaces().then( data => { this.places = data; });
  }
}
