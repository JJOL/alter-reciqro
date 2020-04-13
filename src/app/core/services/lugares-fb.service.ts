import { AngularFirestore } from '@angular/fire/firestore';
import { Place } from '../models/place.model';
import { Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';

const PLACE_KEY = '/centres';

@Injectable({
  providedIn: 'root'
})
export class FBLugaresService {

    constructor(
      private firedb: AngularFirestore
    ) {}

    // addPlace(place: Lugar) {
    //   this.firedb.collection(PLACE_KEY).add({
    //     placeId: place.idlugar,
    //     placeName: place.nombre 
    //   })
    // }

    getAllPlaces(): Promise<any[]> {
      return new Promise((resolve, reject) => {
        let subscription: Subscription;
        subscription = this.firedb.collection(PLACE_KEY).valueChanges()
        .pipe(map(snapshot => {
          return snapshot.map(place => {
            let lugar = {
              nombre: place['name']
            };
            return lugar;
          })
        }))
        .subscribe(places => {
          resolve(places)
          subscription.unsubscribe();
        })
      });
      
    }

  }
  