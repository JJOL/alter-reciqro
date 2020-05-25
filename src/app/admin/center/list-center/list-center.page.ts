import { Component, OnInit } from '@angular/core';
import { PlacesService } from 'src/app/core/services/places.service';
import { AlertController } from '@ionic/angular';
import {ToastController} from '@ionic/angular';

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
  listPlaces: any[];
  actualPage = 1;
  ordered = false;

  /**
   * User Story ID: M1NG4
   * Retrieves all places from the service when page loads
   */
  constructor(private placesService: PlacesService,  private alertCtrl: AlertController,  private toastCtrl: ToastController) {
  }

  /**
   * User Story ID: M1NG4
   * Retrieves all places from the service when page loads
   */
  ngOnInit() {
  }

  /**
   * User Story ID: M1NG4
   * Retrieves all places from the service when page loads
   */
  ionViewWillEnter() {

    this.placesService.loadAdminPlaces()
        .then(places => {
          this.places = places;
          this.listPlaces = this.places;
        });
  }

  /**
   * User Story ID: M1NG3
   * Warns the user before deleting a place with an alert
   */
  onDeletePlace(placeId: string) {
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
            this.placesService.loadAdminPlaces()
                .then(places => {
                  this.places = places;
                  this.listPlaces = this.listPlaces.filter( place => { return place.id!==placeId});
                  this.showToast('Lugar eliminado de manera exitosa');
                });
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
   * Retrieves a shuffled array of places
   */
  shuffle(list) {
    return list.reduce((p, n) => {
      const size = p.length;
      const index = Math.trunc(Math.random() * (size - 1));
      p.splice(index, 0, n);
      return p;
    }, []);
  };

  /**
   * User Story ID: M1NG4
   * Retrieves all places from the service ordered by name
   */
  filterByName(){
    if(true === this.ordered){
      this.listPlaces = this.shuffle(this.listPlaces);
      this.ordered = false;
    }else{
      this.listPlaces = this.listPlaces.sort(function(a, b) {
        var textA = a.name.toUpperCase();
        var textB = b.name.toUpperCase();
        return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
      });
      this.ordered = true;
    }
  }

  /**
   * User Story ID: M1NG4
   * Retrieves all places that have the name searched
   */
  searchByName(event){
    0 === event.detail.value.length  ? this.listPlaces = this.places:
    this.listPlaces = this.places.filter( place => {
      return place.name.toLowerCase().indexOf(event.detail.value.toLowerCase()) !== -1;
    })
  }
  /**
   * User Story ID: M1NG3
   * Function for showing the toast to the user.
   * @param  {} msg
   */
  public showToast(msg) {
    this.toastCtrl.create({
      message: msg,
      duration: 2000,
      position: 'middle',
      color: 'success'
    }).then(toast => toast.present());
  }
}
