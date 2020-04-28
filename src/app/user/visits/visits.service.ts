import { Injectable } from '@angular/core';
import { AuthService } from 'src/app/core/services/auth.service';
import { PlacesService } from 'src/app/core/services/places.service';
import { AngularFirestore } from '@angular/fire/firestore';

const VISITS_KEY: string = "visited_places_users";

@Injectable({
  providedIn: 'root'
})
export class VisitsService {

  constructor(
    private auth: AuthService,
    private placesService: PlacesService,
    private firedb: AngularFirestore
  ) { }

  getAllVisitsForUser(): Promise<any> {
    return new Promise(async (resolve, reject) => {

      let visitsAsyncs: Promise<any>[] = [];

      try {
        let user = await this.auth.getCurrentUser();
        let fbvisits = await this.firedb.collection(VISITS_KEY)
        .ref.where('user_id', '==', user.id)
        .get();

        fbvisits.docs.forEach(fbvisit => {
          let data = fbvisit.data();
          data.date = data.date.toDate();

          visitsAsyncs.push(
            this.placesService.getPlaceByID(data.place_id)
            .then(place => {
              data.place = place;
              return data;
            })
          );
        
          console.log(data.place_id);
          
          data.place = await this.placesService.getPlaceByID(data.place_id);
          console.log(data.place.name);



          return await Promise.all(visitsAsyncs);
          
          
          return data;
        });

        resolve(visits);
      } catch (err) {
        reject(err);
      }
      
    });
    
  }

  registerQRVisit(qrUrl: string): Promise<void> {

    return new Promise(async (success, reject) => {

      try {
        let user = await this.auth.getCurrentUser();
        console.log(user);
        
        let place = await this.placesService.getPlaceByQRCode(qrUrl);

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
