import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import 'firebase/firestore';
import { Subscription } from 'rxjs';
import { map,take } from 'rxjs/operators';
import { DelegationModel } from '../models/delegation.model';

const DELEGATION_KEY = '/delegation';

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
 * Service for delegations CRUD 
 */
export class DelegationService {

  // eslint-disable-next-line require-jsdoc
  constructor(public firedb: AngularFirestore) { }

  /**
   * Return all delegations 
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
