import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import 'firebase/firestore';
import { Subscription } from 'rxjs';
import { map,take } from 'rxjs/operators';
import { DelegationModel } from '../models/delegation.model';

const DELEGATION_KEY = '/delegation';
/**
 * User Story ID: M4NC5
 * Function that casts a firebase delegation to our delegation model.
 * @param  {any} fbDelegation
 * @returns DelegationModel
 */
function parseFBPDelegationToDelegation(fbDelegation: any): DelegationModel {
  const data  = fbDelegation.payload.doc.data();
  const id = fbDelegation.payload.doc.id;
  const waste = new DelegationModel(
      id,
      data.name,
  );
  return waste;
}

@Injectable({
  providedIn: 'root'
})

/**
 * Service that provides funcionality for delegations (e.g. Felipe Carrillo Puerto). 
 * It has all functionalities for retrieving and saving data.
 */
export class DelegationService {
  /**
   * Constructor for the class, only external service used will be the Firestore one.
   * @param  {AngularFirestore} publicfiredb
   */
  constructor(public firedb: AngularFirestore) { }
  /**
   * User Story ID: M4NC5
   * Function that returns all delegations on the database, unfiltered, with all its associated data.
   * @returns Promise
   */
  getDelegations(): Promise<DelegationModel[]> {
    return new Promise((resolve) => {
      let subscription: Subscription;
      subscription = this.firedb.collection<any>(DELEGATION_KEY).snapshotChanges()
          .pipe(map(snapshot => {
            return snapshot.map(parseFBPDelegationToDelegation);
          }))
          .subscribe(delegation => {
            if (subscription) {
              subscription.unsubscribe();
            }
            resolve(delegation);
          });
    });
  }

  /**
   * Return a delegation based on its ID
   * @param  {string} id
   * @returns Promise<Place>
   */
  getDelegationByID(id: string): Promise<DelegationModel> {
    return new Promise((resolve) => {
      let subscription: Subscription;
      subscription = this.firedb.collection<any>(DELEGATION_KEY).doc<any>(id).valueChanges()
          .pipe(
              take(1),
              map(delegation => {return delegation}))
          .subscribe(delegation => {
            if (subscription) {
              subscription.unsubscribe();
            }
            resolve(delegation);
          });
    });
  }

}
