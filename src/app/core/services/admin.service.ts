import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Subscription } from 'rxjs';
import { AdminModel } from '../models/admin.model';
import { map } from 'rxjs/operators';


const USER_KEY = '/users';
/**
 * User Story ID: M4NG6
 * Function that casts a firebase delegation to our delegation model.
 * @param  {any} fbDelegation
 * @returns DelegationModel
 */
export function parseFBPUserToUser(fbUser: any): AdminModel {
  const data  = fbUser.payload.doc.data();
  const id = fbUser.payload.doc.id;
  const admin = new AdminModel(
      id,
      data.alias,
      data.delegation_id,
      data.points,
      data.roles
  );
  return admin;
}



@Injectable({
  providedIn: 'root'
})

/**
 * Service that provides funcionality for administrators. 
 * It has all functionalities for retrieving and saving data.
 */
export class AdminService {

  /**
   * Constructor for the class, only external service used will be the Firestore one.
   * @param  {AngularFirestore} publicfiredb
   */
  constructor(public firedb: AngularFirestore) { }

  /**
   * User Story ID: M4NG6
   * Function that returns all administrators on the database, with all its associated data.
   * @returns Promise
   */
  getAllAdministrators(): Promise<AdminModel[]> {
    return new Promise((resolve) => {
      let subscription: Subscription;
      subscription = this.firedb.collection<any>(USER_KEY).snapshotChanges()
          .pipe(map(snapshot => {
            return snapshot.map(parseFBPUserToUser);
          }))
          .subscribe(user => {
            if (subscription) {
              subscription.unsubscribe();
            }
            resolve(user);
          });
    });
  }

  /**
   * User Story Id: M4NG5
   * Function that removes privileges from a user and leaves them only with user privileges
   * @param  {string} id
   * @returns void
   */
  removeAdministratorUser(id: string){
    return new Promise<any>((resolve, reject) => {
      this.firedb.collection(USER_KEY).doc(id).set({
        roles: ['user'],
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
   * User Story Id: M4NG4
   * Function that adds Staff privileges and leaves the user with staff and user privileges
   * @param  {string} id
   * @returns void
   */
  addAdministratorUser(id: string){
    return new Promise<any>((resolve, reject) => {
      this.firedb.collection(USER_KEY).doc(id).set({
        roles: ['staff','user'],
      }, {merge: true} )
          .then(
              (res) => {
                resolve(res);
              },
              err => reject(err)
          );
    });
  }
}
