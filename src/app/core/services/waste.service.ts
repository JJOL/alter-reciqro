import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import 'firebase/firestore';
import { WasteType, PlacesWasteTypes } from '../models/waste-type';
import { Subscription } from 'rxjs';
import { map,} from 'rxjs/operators';

const WASTE_TYPE_KEY = '/waste_type';

/**
 * User Story ID: M1NC3
 * Function that casts a firebase waste to our delegation model.
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
 * Service that provides funcionality for wastes (e.g. pilas). It has all functionalities for retrieving and saving data.
 */
export class WasteService {
  /**
   * Constructor for the class, only external service used will be the Firestore one.
   * @param  {AngularFirestore} publicfiredb
   */
  constructor(public firedb: AngularFirestore) { }
  /**
   * User Story ID: M1NC3
   * Function that returns all wastes on the database, unfiltered, with all its associated data.
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


  /**
   * User Story Id: M1NG7, M1NG11
   * Fuction that returns the WasteTypes based on the wastesid of a particular place type
   * @param  {PlacesWasteTypes} filters
   * @param  {WasteType} allwastes
   * @returns WasteType[]
   */
  getWastesByWasteId(filters: PlacesWasteTypes[], allwastes: WasteType[]): WasteType[] {
    let result: WasteType[];
    let keys: string[] = filters.map(item => item.waste_type);
    result = allwastes.filter(function(item){
      return keys.includes(item.id);
    });
    return result;
  }

  /**
   * User Story Id: M1NG11
   * Fuction that returns the WasteTypes not associated to a particular place type
   * @param  {PlacesWasteTypes} filters
   * @param  {WasteType} allwastes
   * @returns WasteType[]
   */
  getNoWastesByWasteId(filters: PlacesWasteTypes[], allwastes: WasteType[]): WasteType[]{
    let result: WasteType[];
    let keys: string[] = filters.map(item => item.waste_type);
    result = allwastes.filter(function(item){
      return !keys.includes(item.id);
    });
    return result;
  }

  

}
