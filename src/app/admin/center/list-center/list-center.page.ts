import { Component, OnInit } from '@angular/core';
import { PlacesService } from 'src/app/core/services/places.service';
import { AlertController } from '@ionic/angular';


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
  actualPage = 1;
  ordered: boolean = false;

  /**
   * User Story ID: M1NG4
   * This function retrieves all places from the service when page loads
   */
  constructor(private placesService: PlacesService,  private alertCtrl: AlertController) {
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

  /**
   * User Story ID: M1NG3
   * This function warns the user before deleting a place with an alert
   */
  onDeletePlace(placeId: string, name: string) {
    this.alertCtrl.create ({
      header: '¿Estas seguro?',
      message: '¿De verdad quieres eliminar este lugar?',
      buttons: [{
        text: 'Cancelar',
        role: 'cancel'
      }, {
        text: 'Borrar',
        handler: () => {
          this.placesService.deletePlaceByID(placeId).then(() => {
            this.placesService.getAllPlaces().then( data => { this.places = data; });
          })
              .catch(() => {});
        }
      }]
    }).then(alertEl => {
      alertEl.present();
    });
  }

   /**
   * User Story ID: M1NG4
   * This function retrieves all places from the service ordered by name
   */
  filterByName(){
    this.ordered ? this.placesService.getAllPlaces().then( data => { 
      this.places = data; 
      this.ordered = false;
    }) : 
    this.placesService.getAllPlacesOrderedBYName().then( 
      data => { this.places = data;
      this.ordered = true;
      });
  }

  /**
   * User Story ID: M1NG4
   * This function retrieves all places that have the name searched
   */
  searchByName(event){
    event.detail.value.length == 0 ?
    this.placesService.getAllPlaces().then( data => { this.places = data; }) : 
    this.placesService.getAllPlaces().then( data => { 
      this.places = data; 
      this.places = this.places.filter( place => {
        //console.log(place.name.toLowerCase);
        return place.name.toLowerCase().indexOf(event.detail.value.toLowerCase()) !== -1;
      });
    });
    
    
    console.log( event.detail.value.length);
    console.log(event.detail.value);

  }
}
