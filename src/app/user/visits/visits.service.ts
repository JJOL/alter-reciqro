import { Injectable } from '@angular/core';
import { AuthService } from 'src/app/core/services/auth.service';
import { PlacesService } from 'src/app/core/services/places.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { database } from 'firebase';

const VISITS_KEY = 'visited_places_users';

@Injectable({
  providedIn: 'root'
})
export class VisitsService {

  constructor(
    private auth: AuthService,
    private placesService: PlacesService,
    private firedb: AngularFirestore
  ) { }

  /**
   * User Story ID: M1NG6
   * Description: Returns an array of {date: Date, place: Place } visits made by the logged user.
   * @returns Promise<any[]>
   */
  getAllVisitsForUser(): Promise<any[]> {

    return new Promise(async (resolve,reject) => {
      try {
        let user = await this.auth.getCurrentUser();
        let fbvisits = await this.firedb.collection(VISITS_KEY)
            .ref.where('user_id', '==', user.id)
            .get();

        let promises: Promise<any>[] = [];
        let visits: any[] = [];

        fbvisits.forEach(fbvisit => {
          let visitData = fbvisit.data();
          visitData.date = visitData.date.toDate();
          promises.push(this.placesService.getPlaceByID(visitData.place_id)
              .then(place => 
              {
                visitData.place = place;
                return visits.push(visitData);
              }));
        });
        
        await Promise.all(promises);

        resolve(visits);
      }
      
      catch(err) {
        reject(err);
      }

    });
    
  }
  /**
   * User Story ID: M1NG6
   * Description: Tries to find a place for the matching QR Code and returns it.
   * @param  {string} qrUrl
   * @returns Promise
   */
  registerQRVisit(qrUrl: string): Promise<void> {

    return new Promise(async (success, reject) => {

      try {
        let user = await this.auth.getCurrentUser();        
        let place = await this.placesService.getPlaceByID(qrUrl);

        let visitStatus = await this.firedb.collection(VISITS_KEY).add({
          user_id: user.id,
          date: new Date(),
          place_id: place.id,
          user_delegation_id: user.delegation_id
        });

        success();
      }
      catch(err) {
        reject(err);
      }

    });
  }
}
