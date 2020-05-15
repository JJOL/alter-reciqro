import { User } from './../models/user.model';
/* eslint-disable @typescript-eslint/no-explicit-any */
import { DocumentSnapshot } from '@angular/fire/firestore';
import { take, map } from 'rxjs/operators';
import { Subscription } from 'rxjs';
import { SystemService } from 'src/app/core/services/system.service';
import { UserEvent } from '../models/userevent.model';
import { Injectable } from '@angular/core';
import { FirebaseDatabase } from '@angular/fire';

const USER_EVENT_KEY = 'user_interested_event';

/**
 * Description: Parses Firebase Snapshot userevent to userevent Model.
 * @param  {any} UserEvent
 * @returns UserEvent
 */
function parseFBUserEventToUserEvent(UserEvent: any): UserEvent {
  return fbUserEventSnapToUserEvent(UserEvent.payload.doc);
}
/**
 * Description: Parses Firebase Snapshot userevent to userevent Model.
 * @param  {any} fbUserEventSnap
 * @returns UserEvent
 */
function fbUserEventSnapToUserEvent(fbUserEventSnap: DocumentSnapshot<any>): UserEvent {
  const data  = fbUserEventSnap.data();
  const id = fbUserEventSnap.id;

  const userEvent = new UserEvent(
      id,
      data.event_id,
      data.user_mail
  );
  return userEvent;
}

@Injectable({
  providedIn: 'root'
})
/**
 * user-event service
 * Description: Manages User Events State
 */
export class UserEventService {

  // eslint-disable-next-line require-jsdoc
  constructor(
    private firedb: SystemService
  ) { }


  /**
   * User Story ID: M2NC7
   * Description: Delete a user interest registered in a event
   * @param  {string} id
   */
  async deleteUserEventByID(id: string): Promise<void> {
    return new Promise((resolve) => {
      this.firedb.collection<UserEvent>(USER_EVENT_KEY).doc<UserEvent>(id).delete().then(() => {
        resolve();
      });
    });
  }

  /**
   * User Story ID: M2NC7
   * Description: This function creates a user interest registered in a event in firebase
   * @param  {} userEvent
   */
  createUserEvent(eventId, userMail) {
    return new Promise<any>((resolve, reject) => {
      this.firedb.collection(USER_EVENT_KEY).add({
        event_id: eventId,
        user_mail: userMail
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
   * User Story ID: M2NC7
   * Function that returns a specific user interest registered in a event on the database, filtered by its id, with all its associated data.
   * @param  {string} id
   * @returns Promise
   */
  async getUserEventByID(eventId, userMail): Promise<UserEvent> {
    return new Promise((resolve) => {
      let subscription: Subscription;
      subscription =  this.firedb.collection<any>(USER_EVENT_KEY, ref =>
        ref.where('event_id', '==', eventId)
            .where('user_mail', '==', userMail)).snapshotChanges()
          .pipe(map(userEvents => {
            return userEvents.map(parseFBUserEventToUserEvent);
          }))
          .subscribe(userEvent => {
            if (subscription) {
              subscription.unsubscribe();
            }
            resolve(userEvent[0]);
          });
    });
  }


}
