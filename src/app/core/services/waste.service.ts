import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import * as firebase from 'firebase/app';
import 'firebase/firestore';
import { WasteType } from '../models/waste-type';
import { Subscription } from 'rxjs';
import { map } from 'rxjs/operators';

const WASTE_TYPE_KEY = '/waste_type';

function parseFBPWasteToWaste(fbWaste: any): WasteType {
  const data  = fbWaste.payload.doc.data();
  const id = fbWaste.payload.doc.id;
  const waste = new WasteType(
    id,
    data.name,
    data.description,
    data.icon,
  );
  return waste;
}

@Injectable({
  providedIn: 'root'
})
export class WasteService {

  constructor(public firedb: AngularFirestore) { }

  getWastes(): Promise<WasteType[]> {
    return new Promise((resolve, reject) => {
      let subscription: Subscription;
      subscription = this.firedb.collection<any>(WASTE_TYPE_KEY).snapshotChanges()
      .pipe(map(snapshot => {
        return snapshot.map(parseFBPWasteToWaste);
      }))
      .subscribe(wastes => {
        if (subscription) {
          subscription.unsubscribe();
        }
        resolve(wastes);
      });
    });
  }
}
