import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import {WasteType,PlacesWasteTypes} from '../models/waste-type';
import { async } from '@angular/core/testing';
const PLACE_KEY = '/place_type';
const PLACE_TYPE_PLACE = '/places_waste_types';
const PLACE_TYPE_KEY = '/place_type';
import {PlacesService} from './places.service';

@Injectable({
  providedIn: 'root'
})
export class WastesService {

  constructor(private firedb: AngularFirestore) {   }
 async getAllWasteTypes(): Promise<any[]> {
    return new Promise((resolve, reject) => {
      let subscription: Subscription;
      subscription = this.firedb.collection<WasteType>(PLACE_KEY).snapshotChanges()
      .pipe(map(snapshot => {
        return snapshot.map(wastetype  => {
          let data = wastetype.payload.doc.data()
          let id = wastetype.payload.doc.id;
          return {id:id,...data};
        })
      }))
      .subscribe(places => {
        resolve(places)
        if(subscription)
        subscription.unsubscribe();
      })
    });
  }
  async getPlacesByType(filters:string[]): Promise<PlacesWasteTypes[]> {
    return new Promise((resolve, reject) => {
      let subscription: Subscription;
      subscription = this.firedb.collection<PlacesWasteTypes>(PLACE_TYPE_PLACE,ref => ref.where('waste_type','in',filters)  ).snapshotChanges()
      .pipe(map(snapshot => 
        {
        return snapshot.map(wastetype  => {
          let data = wastetype.payload.doc.data()
          let id = wastetype.payload.doc.id;
          return {id:id,...data};
        })
      }))
      .subscribe(places => {
        resolve(places)
        if(subscription)
        subscription.unsubscribe();
      })
    });
  }


}
