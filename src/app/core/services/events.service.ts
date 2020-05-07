import { Injectable } from '@angular/core';
import { EventModel } from '../models/event.model';
import { AngularFirestore,DocumentSnapshot } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';
import { Subscription } from 'rxjs';
import { SystemService } from './system.service';
import { parseFBPlaceToPlace } from './places.service';

const EVENTS_KEY = '/events';


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
  console.log(fbEvent);
  return parseFBEventToEvent(fbEvent.payload.doc)
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
  /**
   * Constructor for the class, only external service used will be the Firestore one.
   * @param  {AngularFirestore} privatefiredb
   */
  constructor(private firedb: SystemService) 
  {}
  /** 
   * User Story ID: M1NC1
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
   * Function that returns a specific place on the database, filtered by its id, with all its associated data.
   * @param  {string} id
   * @returns Promise
   */
  getEventByID(id:string): Promise<EventModel> {
    return new Promise((resolve) => {
      let subscription: Subscription;
      subscription=this.firedb.collection(EVENTS_KEY).doc(id).snapshotChanges().pipe(map(snapshot => {
        
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


}
