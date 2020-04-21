import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import 'firebase/firestore';
import { Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
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

export class DelegationService {

  constructor(public firedb: AngularFirestore) { }

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
  
}
