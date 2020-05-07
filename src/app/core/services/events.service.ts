import { Injectable } from '@angular/core';
import { EventModel } from '../models/event.model';
import { AngularFirestore, DocumentSnapshot } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';
import { Subscription } from 'rxjs';
import { SystemService } from './system.service';

const EVENTS_KEY = '/events';
/**
 * User Story ID: M1NCx
 * Function that casts a firebase payload snapshot to our place model.
 * @param  {any} fbPlace
 * @returns Place
 */
export function parseFBEventSnapToPlace(fbWaste: any): EventModel {
  return parseFBEventToEvent(fbWaste.payload.doc);
}

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

/**
 * User Story ID: M2NC2
 * Function that casts a firebase event to our event model.
 * @param  {any} fbWaste
 * @returns WasteType
 */
export function parseFBEventDocToEvent(fbWaste: any): EventModel {
  const data  = fbWaste.payload.data();
  const id = fbWaste.payload.id;
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
  
  // eslint-disable-next-line require-jsdoc
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

  // eslint-disable-next-line require-jsdoc
  // getEventByID(id: string): Promise<EventModel> {
  //   return new Promise((resolve, reject) => {
      

  //     let eventRef = this.firedb.collection(EVENTS_KEY).doc(id).ref;
  //     eventRef.get().then(docSnap => {
  //       if (docSnap.exists) {
  //         console.log('PLACE ITEM DOES EXIST');
          
  //         let place = parseFBEventToEvent(docSnap as DocumentSnapshot<any>);     
  //         console.log(place)  
  //         resolve(place);     
  //       }
  //       else {
  //         reject('ERROR: PlacesService.getPlaceByID(): Place does not exist.');
  //       }
  //     })
  //         .catch(err => {
            
  //           reject(err);
  //         });
  //   });
  // }

}
