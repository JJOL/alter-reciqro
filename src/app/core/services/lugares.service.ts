import { AngularFirestore, AngularFirestoreCollection, DocumentReference } from '@angular/fire/firestore';
import { Subscription } from 'rxjs';
import { map, take } from 'rxjs/operators';

import { Injectable } from '@angular/core';
import { Place } from '../models/lugar.model';
import { TipoInstalacion } from '../models/tipo-instalacion.model';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

const PLACE_KEY = '/places';

@Injectable({
  providedIn: 'root'
})

export class LugaresService {
  placeTypes: any;
  
  constructor(private firedb: AngularFirestore) {
    
  }
  
  async getAllPlaces(): Promise<any[]> {
    return new Promise((resolve, reject) => {
      let subscription: Subscription;
      subscription = this.firedb.collection<Place>(PLACE_KEY).snapshotChanges()
      .pipe(map(snapshot => {
        return snapshot.map(place  => {
          const data  = place.payload.doc.data();
          const id = place.payload.doc.id;
          return {id, ...data};
        })
      }))
      .subscribe(places => {
        resolve(places)
        if(subscription)
        subscription.unsubscribe();
      })
    });  
  }

  async getPlaceByID(id: string): Promise<Place> {
    return new Promise((resolve, reject) => {
      let subscription: Subscription;
      subscription = this.firedb.collection<Place>(PLACE_KEY).doc<Place>(id).valueChanges()
      .pipe(
        take(1),
        map(
          place => {
            place.id = id;

            return place
          }
        ))
      .subscribe(places => {
        resolve(places)
        if(subscription)
        subscription.unsubscribe();
      })
    });  
  }

  

  async deletePlaceByID(id: string): Promise<void> {
    return new Promise((resolve, reject) => {
      this.firedb.collection<Place>(PLACE_KEY).doc<Place>(id).delete();
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
        })
      }))
      .subscribe(places => {
        resolve(places)
        if(subscription)
        subscription.unsubscribe();
      })
    });  
  }

  /*

  

  getPlaceTypeByID(id: string): Observable<Lugar> {
    console.log(id);
    return this.placeTypeCollection.doc<TipoInstalacion>(id).valueChanges().pipe(
      take(1),
      map(place => {
        place.id = id;

        return place
      })
    );
  }
  
  getPlacesByPosition(lat: number, lng: number, radius: number): Lugar[] {
    return [...this.fakePlaces.filter(place => this.distanceBetween(place.latitud, place.longitud, lat, lng) <= radius )];
  }

  private distanceBetween(lat1: number, lng1: number, lat2: number, lng2: number): number {
    const latSqrd = Math.pow(lat1 - lat2, 2);
    const lngSqrd = Math.pow(lng1 - lng2, 2);
        
    return Math.sqrt(latSqrd + lngSqrd);
  }*/

}