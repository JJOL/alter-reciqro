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
    data.qr_code
  );
  // const place: Place = {
  //   id: id,
  //   name: data.name,
  //   address: data.address,
  //   description: data.description,
  //   location: {
  //     lat: data.location.latitude,
  //     lng: data.location.longitude
  //   },
  //   photo: data.photo,
  //   places_type: data.places_type,
  //   qr_code: data.qr_code,
  //   postal_code: data.postal_code
  // }
  return place;
}

function isWithin(val, min, max) {
  return val > min && val < max;
}

@Injectable({
  providedIn: 'root'
})
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
  // Esta está bien
  async getIDPlacesTypesByWaste(filters: WasteType[]): Promise<TipoInstalacion[]> {
    return new Promise((resolve, reject) => {
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

  async getIDPlacesByPlacesType(placetype: any[]): Promise<Place[]> {
    const clean =  Array.from(new Set (placetype.map(data => data.place_type)));
    const placetyperef =   clean.map( ele => this.firedb.doc('place_type/' + ele).ref);
    return new Promise((resolve, reject) => {
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
