/* eslint-disable max-params */
import { Injectable } from '@angular/core';
import { WasteType, PlacesWasteTypes } from '../models/waste-type';
import { Subscription } from 'rxjs';
import { map, take} from 'rxjs/operators';
import { SystemService } from './system.service';

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
   * @param  {AngularFirestore} firedb
   */
  constructor(public firedb: SystemService) { }
  /**
   * User Story ID: M1NC3
   * Function that returns all wastes on the database, unfiltered, with all its associated data.
   * @returns Promise<WasteType[]>
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
   * Fuction that returns the placesServiceWasteTypes not associated to a particular place type
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

  /**
   * User Story Id: M2NG12
   * Method that get an especific waste based on its id
   * @param  {string} id
   * @returns Promise<WasteTypes>
   */
  getWasteById(id: string): Promise<WasteType>{
    return new Promise((resolve) => {
      let subscription: Subscription;
      subscription = this.firedb.collection<any>(WASTE_TYPE_KEY).doc<any>(id).valueChanges()
          .pipe(
              // eslint-disable-next-line @typescript-eslint/no-magic-numbers
              take(1),
              map(
                  wasteType => {
                    wasteType.id = id;
                    return wasteType;
                  }
              ))
          .subscribe(wastes => {
            if (subscription) {
              subscription.unsubscribe();
            }
            resolve(wastes);

          });
    });
  }


  /**
   * User Story Id: M2NG12
   * Method that updates an especific waste based on its id
   * @param  {string} id
   * @param {string} namewastetype
   * @param {string} urlwastetype
   * @param {string} descriptionwastetype
   * @returns Promise<any>
   */
  updateWasteType(id: string, namewastetype: string, urlwastetype: string, descriptionwastetype: string): Promise<any>{
    return new Promise<any>((resolve, reject) => {
      this.firedb.collection(WASTE_TYPE_KEY).doc(id).set({
        name: namewastetype,
        icon: urlwastetype,
        description: descriptionwastetype
      }, {merge: true} )
          .then(
              (res) => {
                resolve(res);
              },
              err => reject(err)
          );
    });
  }

  /**
   * User Story Id: M2NG14
   * Method called to add a new waste type
   * @param  {string} namewastetype
   * @param {string} urlwastetype
   * @param {string} descriptionwastetype
   * @returns Promise <any>
   */
  addWasteType(namewastetype: string, urlwastetype: string, descriptionwastetype: string): Promise<any>{
    return new Promise<any>((resolve, reject) => {
      this.firedb.collection(WASTE_TYPE_KEY).add({
        name: namewastetype,
        icon: urlwastetype,
        description: descriptionwastetype
      })
          .then(
              (res) => {
                resolve(res);
              },
              err => reject(err)
          );
    });
  }


  /**
   * User Story Id: M2NG13
   * Method that deletes a selected waste
   * @param {string} wasteTypeId
   * @returns Promise<any>
   */
  deleteWasteTypeByID(wasteTypeId: string): Promise<any>{
    return new Promise((resolve) => {
      this.firedb.collection<WasteType>(WASTE_TYPE_KEY).doc<WasteType>(wasteTypeId).delete().then(() => {
        resolve();
      });
    });
  }

  

}
