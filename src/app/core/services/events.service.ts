import { Injectable } from '@angular/core';
import { EventModel } from '../models/event.model';
import { AngularFirestore } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';
import { Subscription } from 'rxjs';
import { SystemService } from './system.service';

const EVENTS_KEY = '/events';

/**
 * User Story ID: M2NC2
 * Function that casts a firebase event to our event model.
 * @param  {any} fbWaste
 * @returns WasteType
 */
export function parseFBEventToEvent(fbWaste: any): EventModel {
  const data  = fbWaste.payload.doc.data();
  const id = fbWaste.payload.doc.id;
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
            return snapshot.map(parseFBEventToEvent);
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
