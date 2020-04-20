import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import * as firebase from 'firebase/app';
import 'firebase/firestore';
import { WasteType } from '../models/waste-type';
import { Subscription } from 'rxjs';
import { map } from 'rxjs/operators';

const WASTE_TYPE_KEY = '/waste_type';
/**
 * Castea el snapshot del objecto a uno tipo Waste
 * @param  {any} fbWaste
 * @returns WasteType
 */
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
/**
 * Servicio para CRUD del tipo Waste
 */
export class WasteService {

  // eslint-disable-next-line require-jsdoc
  constructor(public firedb: AngularFirestore) { }
  /**
   * Regresa una promesa que regresará una lista de WasteTypes
   * @returns Promise
   */
  getWastes(): Promise<WasteType[]> {
    return new Promise((resolve) => {
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
