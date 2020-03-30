import { AngularFirestore, AngularFirestoreCollection, DocumentReference } from '@angular/fire/firestore';
import { Subscription } from 'rxjs';
import { map, take } from 'rxjs/operators';

import { Injectable } from '@angular/core';
import { Lugar } from '../models/lugar.model';
import { TipoInstalacion } from '../models/tipo-instalacion.model';

import { Observable } from 'rxjs';

const PLACE_KEY = '/centres';

@Injectable({
  providedIn: 'root'
})

export class LugaresService {
  
  private places: Observable <Lugar[]> ;
  private placeTypes: Observable <TipoInstalacion[]> ;
  private placeCollection: AngularFirestoreCollection <Lugar>;

  constructor(private afs: AngularFirestore) {
    this.placeCollection = this.afs.collection<Lugar>('center');
    this.places = this.placeCollection.snapshotChanges().pipe(
      map(actions => {
        return actions.map(place => {
          const id = place.payload.doc.id;
          const data = place.payload.doc.data();
          return { id, ...data };
        });
      })
    );
  }

  /*
  _fakePlacetypes: TipoInstalacion[] = [
    {
      idTipoInstalacion : "1",
      nombre : "Separación de desechos",
      descripcion : "Separación de desechos de cualquier tamaño"
    },
    {
      idTipoInstalacion : "2",
      nombre : "Papelera Monumentalísima del Norte",
      descripcion : "Recolección de cartón y papel"
    }
  ];*/

  
  fakePlaces : any [] = [
    {
      idlugar : "1",
      nombre : "Basurero Municipal",
      descripcion : "Basurero extremo de separación de desechos",
      longitud : 100.1234,
      latitud : 100.1234,
      codigoQr : "QR",
      foto : "https://i2.wp.com/www2.municipiodequeretaro.gob.mx/wp-content/uploads/2017/05/prensa_1494002771103.jpg?w=1245&ssl=1",
      calle : "Bernardo Quintana",
      ciudad : "Querétaro",
      cp : 76146,
      tipoDeInstalacion : {
        idTipoInstalacion : "1",
        nombre : "Separación de desechos",
        descripcion : "Separación de desechos de cualquier tamaño"
      }
    },
    {
      idlugar : "2",
      nombre : "Papelera San Juan",
      descripcion : "Recolección masiva de cartón y papel",
      longitud : 444.1234,
      latitud : 500.1234,
      codigoQr : "QR",
      foto : "https://www.diariodequeretaro.com.mx/incoming/yxmvyc-papelera-monumental.jpg/ALTERNATES/LANDSCAPE_1140/Papelera%20monumental.JPG",
      calle : "Arteaga",
      ciudad : "Querétaro",
      cp : 76145,
      tipoDeInstalacion : {
        idTipoInstalacion : "2",
        nombre : "Papelera",
        descripcion : "Recolección de cartón y papel"
      } 
    },
  ];

  getAllPlaces(): Observable<Lugar[]> {
    return this.places;
  }

  allPlaceTypes(): Observable<TipoInstalacion[]> {
    this.placeTypes = this.afs.collection<TipoInstalacion>('centre_type').snapshotChanges().pipe(
      map(actions => {
        return actions.map(placeType => {
          const id = placeType.payload.doc.id;
          const data = placeType.payload.doc.data();
          return { id, ...data };
        });
      })
    );
    return this.placeTypes;
  }
  
  /*
  getPlaceByID(placeId: string): Observable<Lugar> {
    return {
      ...this.places.find( place => {
        return place.id === placeId;
    })};
  }*/

  /*
  getPlaceByID(id: string): Observable<Lugar> {
    return this.placeCollection.doc<Lugar>(id).valueChanges().pipe(
      take(1),
      map(place => {
        place.id = id;
        return place
      })
    );
  }*/

  getPlaceByID(id: string): Observable<Lugar> {
    console.log(id);
    return this.placeCollection.doc<Lugar>(id).valueChanges().pipe(
      take(1),
      map(place => {
        place.id = id;

        return place
      })
    );
  }

  /*
  getPlaceByID (placeId: string) {
    return {
      ...this.fakePlaces.find( place => {
        return place.idlugar === placeId;
    })};
  }*/
 
  /*
  addIdea(place: Lugar): Promise<DocumentReference> {
    return this.placeCollection.add(place);
  }*/

 /*
  updateIdea(place: Lugar): Promise<void> {
    return this.placeCollection.doc(place.id).update({ 
      name: place.name, 
      notes: place.notes });
  }*/
 
  deletePlaceByID(id: string): Promise<void> {
    return this.placeCollection.doc(id).delete();
  }

  
  getPlacesByPosition(lat: number, lng: number, radius: number): Lugar[] {
    return [...this.fakePlaces.filter(place => this.distanceBetween(place.latitud, place.longitud, lat, lng) <= radius )];
  }

  private distanceBetween(lat1: number, lng1: number, lat2: number, lng2: number): number {
    const latSqrd = Math.pow(lat1 - lat2, 2);
    const lngSqrd = Math.pow(lng1 - lng2, 2);
        
    return Math.sqrt(latSqrd + lngSqrd);
  }

  /*
  allPlaceTypes(){
    return [...this._fakePlacetypes];
  }

  allPlaces(){
    return [...this.fakePlaces];
  }
  */

  /*
  getAllPlaces () {
    return [...this.fakePlaces];
  }

  getPlaceByID (placeId: string) {
    return {
      ...this.fakePlaces.find( place => {
        return place.idlugar === placeId;
    })};
  }

  deletePlaceByID (placeId: string) {
    this.fakePlaces = this.fakePlaces.filter(place => {
      return place.idlugar !== placeId;
    });
  }

  createPlace () {

  }

  updatePlaceByID () {

  }

  getPlacesByFilter () {
    
  }*/

}