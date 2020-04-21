import { AngularFirestore, AngularFirestoreCollection, DocumentReference } from '@angular/fire/firestore';
import { Subscription } from 'rxjs';
import { map, take } from 'rxjs/operators';
import * as firebase from 'firebase/app';

import { Injectable } from '@angular/core';
import { Place } from '../models/place.model';
import { TipoInstalacion } from '../models/tipo-instalacion.model';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { WasteType, PlacesWasteTypes } from '../models/waste-type';

const PLACE_KEY = '/places';
const PLACE_TYPE_KEY = '/place_type';
const WASTE_TYPE_KEY = '/waste_type';
const PLACE_TYPE_WASTE_TYPE = '/place_type_waste_type';


const GeoPoint = firebase.firestore.GeoPoint;

/**
 * Castea un snapshot de FB  a Place type
 * @param  {any} fbPlace
 * @returns Place
 */
function parseFBPlaceToPlace(fbPlace: any): Place {
  const icon ='sss';
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

function isWithin(val, min, max) {
  return val > min && val < max;
}

@Injectable({
  providedIn: 'root'
})

 /**
   * Servicio para obtener lugares
   */
export class PlacesService {
  placeTypes: any;

  constructor(
    private firedb: AngularFirestore) {
  }

  getAllPlaces(): Promise<Place[]> {
    return new Promise((resolve, reject) => {
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

  getPlaceByID(id: string): Promise<Place> {
    return new Promise((resolve, reject) => {
      let subscription: Subscription;
      subscription = this.firedb.collection<any>(PLACE_KEY).doc<any>(id).valueChanges()
          .pipe(
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

  async deletePlaceByID(id: string): Promise<void> {
    return new Promise((resolve, reject) => {
      this.firedb.collection<Place>(PLACE_KEY).doc<Place>(id).delete().then(() => {
        resolve();
      });
    });
  }

  async deletePlaceTypeByID(id: string): Promise<void> {
    return new Promise((resolve, reject) => {
      this.firedb.collection<TipoInstalacion>(PLACE_TYPE_KEY).doc<TipoInstalacion>(id).delete().then(() => {
        resolve();
      });
    });
  }

  async allPlaceTypes(): Promise<any[]> {
    return new Promise((resolve, reject) => {
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
   * Obtenemos el tipo de lugar por 
   * @param  {string} id
   * @returns Promise
   */
  getPlaceTypeByID(id: string): Promise<TipoInstalacion> {
    return new Promise((resolve, reject) => {
      let subscription: Subscription;
      subscription = this.firedb.collection<any>(PLACE_TYPE_KEY).doc<any>(id).valueChanges()
          .pipe(
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
  searchMapPlaces(topLeftPos, botRightPos): Promise<Place[]> {

    const minLat = Math.min(topLeftPos.lat, botRightPos.lat);
    const minLng = Math.min(topLeftPos.lng, botRightPos.lng);
    const maxLat = Math.max(topLeftPos.lat, botRightPos.lat);
    const maxLng = Math.max(topLeftPos.lng, botRightPos.lng);

    const maxPoint = new GeoPoint(maxLat, maxLng);
    const minPoint = new GeoPoint(minLat, minLng);

    // const maxPoint = new GeoPoint(topLeftPos.lat, topLeftPos.lng);
    // const minPoint = new GeoPoint(botRightPos.lat, botRightPos.lng);
    let subscription: Subscription;

    return new Promise((resolve, reject) => {
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
  async getAllWasteTypes(): Promise<any[]> {
    return new Promise((resolve, reject) => {
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
   * Esta función regresa todos los lugares en base de los filtros de WasteType
   * @param  {WasteType[]} filters
   * @returns Promise<TipoInstalacion[]>
   */
  async getIDPlacesTypesByWaste(filters: WasteType[]): Promise<TipoInstalacion[]> {
    return new Promise((resolve) => {
      let subscription: Subscription;
      subscription = this.firedb.collection<TipoInstalacion>(PLACE_TYPE_WASTE_TYPE, ref => ref.where('waste_type', 'in', filters.map(item => item.id))  ).snapshotChanges()
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

  updatePlaceType(id: string, name_waste_type: string, url_waste_type: string){
    return new Promise<any>((resolve, reject) => {
      this.firedb.collection(PLACE_TYPE_KEY).doc(id).set({
        name: name_waste_type,
        icon_url: url_waste_type
      }, {merge: true} )
          .then(
              (res) => {
                resolve(res);
              },
              err => reject(err)
          );
    });
  }

  addPlaceTypeFB(name_waste_type:string, url_waste_type: string){
    return new Promise<any>((resolve, reject) => {
      this.firedb.collection(PLACE_TYPE_KEY).add({
        name: name_waste_type,
        icon_url: url_waste_type
      })
          .then(
              (res) => {
                resolve(res);
              },
              err => reject(err)
          );
    });
  }


}
