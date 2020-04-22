import { AngularFirestore } from '@angular/fire/firestore';
import { Subscription } from 'rxjs';
import { map, take } from 'rxjs/operators';
import * as firebase from 'firebase/app';

import { Injectable } from '@angular/core';
import { Place } from '../models/place.model';
import { TipoInstalacion } from '../models/tipo-instalacion.model';
import { WasteType } from '../models/waste-type';

const PLACE_KEY = '/places';
const PLACE_TYPE_KEY = '/place_type';
const WASTE_TYPE_KEY = '/waste_type';
const PLACE_TYPE_WASTE_TYPE = '/place_type_waste_type';

const GeoPoint = firebase.firestore.GeoPoint;

/**
 * User Story ID: M1NCx
 * Function that casts a firebase place to our place model.
 * @param  {any} fbPlace
 * @returns Place
 */
function parseFBPlaceToPlace(fbPlace: any): Place {
  const data  = fbPlace.payload.doc.data();
  const id = fbPlace.payload.doc.id;
  const place = new Place(
      id,
      data.name,
      data.description,
      {
        lat: data.location.latitude,
        lng: data.location.longitude,
      },
      data.address,
      data.postal_code,
      data.places_type,
      data.photo,
      data.qr_code,
  );

  return place;
}
/**
 * User Story ID: NA
 * Function that determines if a value is within a range (min - max).
 * @param  {} val
 * @param  {} min
 * @param  {} max
 */
function isWithin(val: number, min: number, max: number) {
  return val > min && val < max;
}

@Injectable({
  providedIn: 'root'
})

/**
 * Service that provides funcionality for centers which can be seen as places. It has all functionalities for retrieving and saving data.
 */
export class PlacesService {
  placeTypes: any;

  /**
   * Constructor for the class, only external service used will be the Firestore one.
   * @param  {AngularFirestore} privatefiredb
   */
  constructor(private firedb: AngularFirestore) 
  {}
  /** 
   * User Story ID: M1NC1
   * Function that returns all places on the database, unfiltered, with all its associated data.
   * @returns Promise
   */
  getAllPlaces(): Promise<Place[]> {
    return new Promise((resolve) => {
      let subscription: Subscription;
      subscription = this.firedb.collection<any>(PLACE_KEY).snapshotChanges()
          .pipe(map(snapshot => {
            return snapshot.map(parseFBPlaceToPlace);
          }))
          .subscribe(places => {
            if (subscription) {
              subscription.unsubscribe();
            }
            resolve(places);
          });
    });
  }
  /**
   * User Story ID: M1NG7
   * Function that returns a specific place on the database, filtered by its id, with all its associated data.
   * @param  {string} id
   * @returns Promise
   */
  getPlaceByID(id: string): Promise<Place> {
    return new Promise((resolve) => {
      let subscription: Subscription;
      subscription = this.firedb.collection<any>(PLACE_KEY).doc<any>(id).valueChanges()
          .pipe(
              // eslint-disable-next-line @typescript-eslint/no-magic-numbers
              take(1),
              map(
                  place => {
                    place.id = id;
                    place.location = {lat: place.location.latitude, lng : place.location.longitude};

                    return place;
                  }
              ))
          .subscribe(places => {
            if (subscription) {
              subscription.unsubscribe();
            }
            resolve(places);
          });
    });
  }
  /**
   * User Story ID: M1NG3
   * Function that deletes a specific place on the database, chosen by its id, with all its associated data.
   * @param  {string} id
   * @returns Promise
   */
  async deletePlaceByID(id: string): Promise<void> {
    return new Promise((resolve) => {
      this.firedb.collection<Place>(PLACE_KEY).doc<Place>(id).delete().then(() => {
        resolve();
      });
    });
  }

  
  /**
   * User Story ID: M1NG10
   * Function that deletes a specific place type (e.g. Papelera Municipal) on the database, chosen by its id, with all its associated data.
   * @param  {string} id
   * @returns Promise
   */
  async deletePlaceTypeByID(id: string): Promise<void> {
    return new Promise((resolve) => {
      this.firedb.collection<TipoInstalacion>(PLACE_TYPE_KEY).doc<TipoInstalacion>(id).delete().then(() => {
        resolve();
      });
    });
  }
  /**
   * User Story ID: M1NG8
   * Function that returns all places types (e.g. Papelera municipal) on the database, unfiltered, with all its associated data.
   * @returns Promise
   */
  async allPlaceTypes(): Promise<any[]> {
    return new Promise((resolve) => {
      let subscription: Subscription;
      subscription = this.firedb.collection<Place>('place_type').snapshotChanges()
          .pipe(map(snapshot => {
            return snapshot.map(placeType  => {
              const data  = placeType.payload.doc.data();
              const id = placeType.payload.doc.id;
              return {id, ...data};
            });
          }))
          .subscribe(places => {
            if (subscription) {
              subscription.unsubscribe();
            }
            resolve(places);
          });
    });
  }
  
  /**
   * User Story ID: M1NG7
   * Function that returns specific place type (e.g. Papelera Municipal) on the database, filtered by its id, with all its associated data.
   * @param  {string} id
   * @returns Promise
   */
  getPlaceTypeByID(id: string): Promise<TipoInstalacion> {
    return new Promise((resolve) => {
      let subscription: Subscription;
      subscription = this.firedb.collection<any>(PLACE_TYPE_KEY).doc<any>(id).valueChanges()
          .pipe(
              // eslint-disable-next-line @typescript-eslint/no-magic-numbers
              take(1),
              map(
                  placeType => {
                    placeType.id = id;
                    return placeType;
                  }
              ))
          .subscribe(places => {

            if (subscription) {
              subscription.unsubscribe();
            }
            resolve(places);

          });
    });
  }
  /**
   * User Story ID: M1NG1
   * Function that creates a new place on the database.
   * @param  {{latitude:number;longitude:number;address:{street:any;zip:any;};
   * description:any;name:any;mainPicture:any;instalationType:string;qrCode:any;}} placeObject
   */
  createPlace(placeObject: 
    { latitude: number; 
      longitude: number; 
      address: { street: any; zip: any; }; 
      description: any; 
      name: any; 
      mainPicture: any; 
      instalationType: string; 
      qrCode: any; }) {
    const geoPoint = new GeoPoint(placeObject.latitude, placeObject.longitude);
    return new Promise<any>((resolve, reject) => {
      this.firedb.collection(PLACE_KEY).add({
        address: placeObject.address.street,
        description: placeObject.description,
        location: geoPoint,
        name: placeObject.name,
        photo: placeObject.mainPicture,
        places_type: this.firedb.doc('place_type/' + placeObject.instalationType).ref,
        postal_code: placeObject.address.zip,
        qr_code: placeObject.qrCode
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
   * User Story ID: M1NG2
   * Function that edits an existing place on the database, taking from 1 to n parameters.
   * @param  {{latitude:number;longitude:number;address:{street:any;zip:any;};
   * description:any;name:any;mainPicture:any;instalationType:string;qrCode:any;}} placeObject
   * @param  {string} id
   */
  editPlace(placeObject: 
    { latitude: number; 
      longitude: number; 
      address: { street: any; zip: any; }; 
      description: any; 
      name: any; 
      mainPicture: any; 
      instalationType: string; 
      qrCode: any; }, id: string) {
    const geoPoint = new GeoPoint(placeObject.latitude, placeObject.longitude);
    return new Promise<any>((resolve, reject) => {
      this.firedb.collection(PLACE_KEY).doc(id).set({
        address: placeObject.address.street,
        description: placeObject.description,
        location: geoPoint,
        name: placeObject.name,
        photo: placeObject.mainPicture,
        places_type: this.firedb.doc('place_type/' + placeObject.instalationType).ref,
        postal_code: placeObject.address.zip,
        qr_code: placeObject.qrCode
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
   * User Story ID: M1NC1
   * Function that searches in a map for places, limiting the map frame by latitude and longitude.
   * @param  {{lat:any;lng:any;}} topLeftPos
   * @param  {{lat:any;lng:any;}} botRightPos
   * @returns Promise
   */
  searchMapPlaces(topLeftPos: { lat: any; lng: any; }, botRightPos: { lat: any; lng: any; }): Promise<Place[]> {

    const minLat = Math.min(topLeftPos.lat, botRightPos.lat);
    const minLng = Math.min(topLeftPos.lng, botRightPos.lng);
    const maxLat = Math.max(topLeftPos.lat, botRightPos.lat);
    const maxLng = Math.max(topLeftPos.lng, botRightPos.lng);
    
    let subscription: Subscription;

    return new Promise((resolve) => {
      subscription = this.firedb.collection(PLACE_KEY)
          .snapshotChanges()
          .pipe(map(snapshot => {
            return snapshot.map(parseFBPlaceToPlace)
                .filter(place =>
                  isWithin(place.location.lat, minLat, maxLat) && isWithin(place.location.lng, minLng, maxLng
                  )
                );
          }))
          .subscribe(places => {
            resolve(places);
            if (subscription) {
              subscription.unsubscribe();
            }
          });

    });
  }
  
  /**
   * User Story ID: M1NC2
   * Function that returns all wastes (e.g. pilas) that are located on the database. 
   * It is here because it is used on the getIDPlacesTypesByWaste function.
   * @returns Promise
   */
  async getAllWasteTypes(): Promise<any[]> {
    return new Promise((resolve) => {
      let subscription: Subscription;
      subscription = this.firedb.collection<WasteType>(WASTE_TYPE_KEY).snapshotChanges()
          .pipe(map(snapshot => {
            return snapshot.map(wastetype  => {
              const data = wastetype.payload.doc.data();
              const id = wastetype.payload.doc.id;
              return {id, ...data};
            });
          }))
          .subscribe(places => {
            resolve(places);
            if (subscription) {
              subscription.unsubscribe();
            }
          });
    });
  }
 
  /**
   * User Story ID: M1NC2
   * Function that returns all places based on wastes that are passed as parameters.
   * @param  {WasteType[]} filters
   * @returns Promise<TipoInstalacion[]>
   */
  async getIDPlacesTypesByWaste(filters: WasteType[]): Promise<TipoInstalacion[]> {
    return new Promise((resolve) => {
      let subscription: Subscription;
      subscription = this.firedb.collection<TipoInstalacion>(PLACE_TYPE_WASTE_TYPE, 
          ref => ref.where('waste_type', 'in', filters.map(item => item.id))  ).snapshotChanges()
          .pipe(map(snapshot => {
            return snapshot.map(wastetype  => {
              const data = wastetype.payload.doc.data();
              const id = wastetype.payload.doc.id;
              return {id, ...data};
            });
          }))
          .subscribe(places => {
            resolve(places);
            if (subscription) {
              subscription.unsubscribe();
            }
          });
    });
  }

  /**
   * User Story ID: M1NC2
   * Function thar returns the IDs of the all the places under a place type.
   * @param  {any[]} placetype
   * @returns Promise
   */
  async getIDPlacesByPlacesType(placetype: any[]): Promise<Place[]> {
    const clean =  Array.from(new Set (placetype.map(data => data.place_type)));
    const placetyperef =   clean.map( ele => this.firedb.doc('place_type/' + ele).ref);
    return new Promise((resolve) => {
      let subscription: Subscription;
      subscription = this.firedb.collection<Place>(PLACE_KEY, ref => ref.where('places_type', 'in', placetyperef)  ).snapshotChanges()
          .pipe(map(snapshot => {
            return snapshot.map(parseFBPlaceToPlace);
          }))
          .subscribe(places => {
            resolve(places);
            if (subscription) {
              subscription.unsubscribe();
            }
          });
    });
  }
}
