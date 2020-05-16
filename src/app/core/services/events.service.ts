import { resolve } from 'url';
import { Injectable } from '@angular/core';
import { EventModel } from '../models/event.model';
import { AngularFirestore, DocumentSnapshot } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';
import { Subscription } from 'rxjs';
import { SystemService } from './system.service';
import { parseFBPlaceToPlace } from './places.service';
import * as firebase from 'firebase/app';

const EVENTS_KEY = '/events';
const GeoPoint = firebase.firestore.GeoPoint;
const Timestamp = firebase.firestore.Timestamp;
const currentDate = new Date();
/**
 * User Story ID: M2NC2
 * User Story ID M2NC3
 * Function that casts a firebase event to our event model.
 * @param  {any} fbEvent
 * @returns WasteType
 */
export function parseFBEventToEvent(fbEvent: any): EventModel {
  const data  = fbEvent.data();
  const id = fbEvent.id;
  const event = new EventModel(
      id,
      data.age,
      data.name,
      data.description,
      data.start_date.toDate(),
      data.end_date.toDate(),
      data.icon,
      {
        lat: data.location.latitude,
        lng: data.location.longitude,
      }
  );
  return event;
}

/**
 * User Story ID: M2NC2
 * Function that casts a firebase event to our event model.
 * @param  {any} fbEvent
 * @returns WasteType
 */
export function parseFBEventDocToEvent(fbEvent: any): EventModel {
  const data  = fbEvent.payload.data();
  const id = fbEvent.payload.id;

  const event = new EventModel(
      id,
      data.age,
      data.name,
      data.description,
      data.start_date.toDate(),
      data.end_date.toDate(),
      data.icon,
      {
        lat: data.location.latitude,
        lng: data.location.longitude,
      }
  );
  return event;
}

/**
 * @param  {any} fbEvent
 */
export function parseFBEventToEvent2(fbEvent: any): EventModel {

  return parseFBEventToEvent(fbEvent.payload.doc);
}

@Injectable({
  providedIn: 'root'
})
/**
 * Service that provides funcionality for events. It has all functionalities for retrieving and saving data.
 */
export class EventsService {
  /**
   * User Story ID: M1NC1
   * Description: This function returns all the events from firebase.
   * Constructor for the class, only external service used will be the Firestore one.
   * @param  {AngularFirestore} privatefiredb
   */
  constructor(private firedb: SystemService,
              private db: AngularFirestore) {}
  /**
   * User Story ID: M2NC1, M2NC2
   * Function that returns all events on the database, unfiltered, with all its associated data.
   * @returns Promise
   */
  getAllEvents(): Promise<EventModel[]> {
    return new Promise((resolve) => {
      let subscription: Subscription;
      subscription = this.firedb.collection<any>(EVENTS_KEY, ref => ref.orderBy('start_date')).snapshotChanges()
          .pipe(map(snapshot => {
            return snapshot.map(parseFBEventToEvent2);
          }))
          .subscribe(event => {
            if (subscription) {
              subscription.unsubscribe();
            }
            resolve(event);
          });
    });
  }
  /**
   * User Story ID: M2NG4
   * Function that delete a specific event
   * @param  {string} id
   * @returns Promise
   */
  async deleteEventByID(id: string): Promise<void> {
    return new Promise((resolve) => {
      this.firedb.collection<EventModel>(EVENTS_KEY).doc<EventModel>(id).delete().then(() => {
        resolve();
      });
    });
  }

  /**
   * User Story ID: M2NG4,M2NC3
   * Returns a specific place on the database, filtered by its id, along its associated data.
   * @param  {string} id
   * @returns Promise
   */
  getEventByID(id: string): Promise<EventModel> {
    return new Promise((resolve) => {
      let subscription: Subscription;
      subscription = this.firedb.collection(EVENTS_KEY).doc(id).snapshotChanges().pipe(map(snapshot => {

        return parseFBEventDocToEvent(snapshot);
      }))
          .subscribe(event => {
            if (subscription) {
              subscription.unsubscribe();
            }
            resolve(event);
          });
    });
  }
  /**
   * User Story ID: M1NG5
   * Description: This function returns the edited event.
   * @param  {} event
   * @param  {string} id
   */
  editEvent(event, id: string) {
    const geoPoint = new GeoPoint(event.latitude, event.longitude);
    const end_dateO = new Timestamp(Date.parse(event.endDate) / 1000, 0);
    const start_dateO =  new Timestamp(Date.parse(event.startDate) / 1000, 0);
    return new Promise<any>((resolve, reject) => {
      this.firedb.collection(EVENTS_KEY).doc(id).set({
        name: event.name,
        description: event.description,
        icon: event.icon,
        location: geoPoint,
        start_date: start_dateO,
        end_date: end_dateO ,
        age: event.age,
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
   * User Story ID: M1NG2
   * Description: This function creates an event.
   * @param  {} event
   */
  createEvent(event) {
    const geoPoint = new GeoPoint(event.latitude, event.longitude);
    const end_dateO = new Timestamp(Date.parse(event.endDate) / 1000, 0);
    const start_dateO =  new Timestamp(Date.parse(event.startDate) / 1000, 0);
    return new Promise<any>((resolve, reject) => {
      this.firedb.collection(EVENTS_KEY).add({
        name: event.name,
        description: event.description,
        icon: event.icon,
        location: geoPoint,
        start_date: start_dateO,
        end_date: end_dateO ,
        age: event.age,
      } )
          .then(
              (res) => {
                resolve(res);
              },
              err => reject(err)
          );
    });
  }
  /**
   * User Story ID: M1NG2
   * Description: This function deletes the past events.
   * @returns Promise
   */
  async erasePastEvents(): Promise<EventModel> {
    const batch = this.db.firestore.batch();
    return new Promise(async () => {
      const pastEvents =  await this.db.collection(EVENTS_KEY).ref.where('end_date', '<', currentDate).get();
      pastEvents.forEach(event => {
        batch.delete(event.ref);
      });
      await batch.commit();
    });
  }
}
