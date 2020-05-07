import { AngularFirestore, DocumentSnapshot } from '@angular/fire/firestore';
import { Subscription, of } from 'rxjs';
import { map, take, catchError } from 'rxjs/operators';
import * as firebase from 'firebase/app';

import { Injectable } from '@angular/core';
import { Place } from '../models/place.model';
import { TipoInstalacion } from '../models/tipo-instalacion.model';
import { WasteType, PlacesWasteTypes } from '../models/waste-type';

import { SystemService } from './system.service';

const PLACE_KEY = '/places';
const PLACE_TYPE_KEY = '/place_type';
const WASTE_TYPE_KEY = '/waste_type';
const PLACE_TYPE_WASTE_TYPE = '/place_type_waste_type';


const GeoPoint = firebase.firestore.GeoPoint;

/**
 * User Story ID: M1NCx
 * Function that casts a firebase payload snapshot to our place model.
 * @param  {any} fbPlace
 * @returns Place
 */
export function parseFBPlaceToPlace(fbPlace: any): Place {
  return parseFBPlaceDocToPlace(fbPlace.payload.doc);
}
/**
 * User Story ID: M1NCX
 * Description: Parses a Firebase.DocumentSnapshot<Place> to Place object
 * @param  {DocumentSnapshot<any>} fbPlaceDoc
 * @returns Place
 */
export function parseFBPlaceDocToPlace(fbPlaceDoc: DocumentSnapshot<any>): Place {
  const data  = fbPlaceDoc.data();
  const id = fbPlaceDoc.id;
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
   * User Story ID: M1NG4
   * Description: This function returns all the places from firebase.
  /**
   * Constructor for the class, only external service used will be the Firestore one.
   * @param  {AngularFirestore} privatefiredb
   */
  constructor(private firedb: SystemService) 
  {}

  /**
   * User Story ID: M1NG1
   * Description: This function creates a place in firebase
   * @param  {} placeObject
   */
  createPlace(placeObject) {
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
   * User Story ID: M1NG3
   * Description: This function deletes a specific place in firebase using its ID
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
    return new Promise((resolve, reject) => {
      let subscription: Subscription;
      console.log('Calling getPlaceByID()');

      let placeRef = this.firedb.collection(PLACE_KEY).doc(id).ref;
      placeRef.get()
          .then(docSnap => {
            if (docSnap.exists) {
              console.log('PLACE ITEM DOES EXISTS');
              let place = parseFBPlaceDocToPlace(docSnap as DocumentSnapshot<any>);       
              resolve(place);     
            }
            else {
              reject('ERROR: PlacesService.getPlaceByID(): Place does not exist.');
            }
          })
          .catch(err => {
            reject(err);
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
   * User Story ID: M1NG2
   * This function edits a place and it changes the fields only if 
    they are different than the ones in the database
   * @param  {string} id
   * @returns Promise
   */
  editPlace(placeObject, id: string) {
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
   * Esta función la tabla que relaciona place type con waste type
   * @param  {TipoInstalacion[]} filters
   * @returns Promise<WasteType[]>
   */
  async getIDWasteTypeByPlace(filters: TipoInstalacion): Promise<WasteType[]> {
    return new Promise((resolve) => {
      let subscription: Subscription;
      subscription = this.firedb.collection<WasteType>(PLACE_TYPE_WASTE_TYPE, ref => ref.where('place_type', 'in', filters.id)).snapshotChanges()
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
   * User Story ID: M1NC2, M2NG13
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

  /**
   * User Story Id: M1NG11
   * Fuction that updates the values of a Place Type
   * @param  {string} id
   * @param  {string} namewastetype
   * @param  {string} urlwastetype
   * @returns Promise<any>
   */
  updatePlaceType(id: string, namewastetype: string, urlwastetype: string){
    return new Promise<any>((resolve, reject) => {
      this.firedb.collection(PLACE_TYPE_KEY).doc(id).set({
        name: namewastetype,
        icon_url: urlwastetype
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
   * User Story Id: M1NG9
   * Fuction that adds a nuew Place Type
   * @param  {string} namewastetype
   * @param  {string} urlwastetype
   * @returns Promise<any>
   */
  addPlaceTypeFB(namewastetype:string, urlwastetype: string){
    return new Promise<any>((resolve, reject) => {
      this.firedb.collection(PLACE_TYPE_KEY).add({
        name: namewastetype,
        icon_url: urlwastetype
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
   * User Story Id: M1NG7, M1NG11
   * Fuction that gets all the Place Wastes Types based on the place_type
   * @param  {string} placeType
   * @returns Promise<PlacesWasteTypes[]>
   */
  getAllWasteTypeByPlaceType(placeTypeId: string): Promise<PlacesWasteTypes[]> {
    return new Promise((resolve) => {
      let subscription: Subscription;
      subscription = this.firedb.collection<PlacesWasteTypes>(PLACE_TYPE_WASTE_TYPE, ref => ref.where('place_type', '==', placeTypeId)  ).snapshotChanges()
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
   * User Story Id: M1NG10, M1NG11
   * Fuction that deletes all registers in the PlaceWasteType entity for a specific Place Type
   * @param  {string} id
   * @returns void
   */
  deletePlaceWasteType(id: string):void{
    this.firedb.collection<PlacesWasteTypes>(PLACE_TYPE_WASTE_TYPE).doc<PlacesWasteTypes>(id).delete()

  }

  /**
   * User Story Id: M1NG11
   * Fuction that inserts a new register in the PlaceWasteType entity
   * @param  {string} placeId
   * @param  {string} wasteId
   * @returns void
   */
  insertPlaceWasteType(placeId: string, wasteId: string):void{
    this.firedb.collection(PLACE_TYPE_WASTE_TYPE).add({
      place_type: placeId,
      waste_type: wasteId
    })
  }


  

  
  


}
