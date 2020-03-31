import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import {WasteType} from '../models/waste-type';
import { async } from '@angular/core/testing';
const PLACE_KEY = '/waste_types';

@Injectable({
  providedIn: 'root'
})
export class WastesService {

  constructor(private firedb: AngularFirestore) { }

 async getAllWasteTypes(): Promise<any[]> {
    return new Promise((resolve, reject) => {
      let subscription: Subscription;
      subscription = this.firedb.collection(PLACE_KEY).valueChanges()
      .pipe(map(snapshot => {
        return snapshot.map(wastetype  => {
          let waste : WasteType = { icon:wastetype["icon"],name:wastetype["name"] } ;
          console.log(wastetype);
          return waste;
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
