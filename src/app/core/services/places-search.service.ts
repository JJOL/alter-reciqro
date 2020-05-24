import { Injectable } from '@angular/core';
import { SystemService } from './system.service';
import { Place } from '../models/place.model';

import * as firebaseApp from 'firebase/app';
import * as geofirex from 'geofirex';
import { map } from 'rxjs/operators';
import { Subscription } from 'rxjs';
import { WasteType } from '../models/waste-type';
import { TipoInstalacion } from '../models/tipo-instalacion.model';

const MAX_RADIUS_SEARCH = 3;
const RECOMENDED_RADIUS_SEARCH = 1.7;

const PLACE_KEY = '/places';
const PLACE_TYPE_KEY = '/place_type';
const WASTE_TYPE_KEY = '/waste_type';
const PLACE_TYPE_WASTE_TYPE = '/place_type_waste_type';



@Injectable({
  providedIn: 'root'
})
export class PlacesSearchService {

  private geo = geofirex.init(firebaseApp);

  private allPlaceTypes: { [placeTypeKey: string]: TipoInstalacion} = {};
  private loadedPlaceTypes = false;
  private populdatedPlaceTypes = false;
  
  constructor(
    private firedb: SystemService
  ) {}

  
  public async searchPlaces(boundBox: any, filters: WasteType[]): Promise<Place[]> {

    await this.preparePlaceTypes();

    let maxLat = boundBox.northEast.lat,
        maxLng = boundBox.northEast.lng,
        minLat = boundBox.southWest.lat,
        minLng = boundBox.southWest.lng;
        
    let places = await this.searchPlacesWithinBox(minLat, minLng, maxLat, maxLng);
    let acceptedTypes = this.getPlaceTypesForWastes(filters);

    places = places.filter(place => {
      return place.places_type.id in acceptedTypes;
    })
    .map(place => {
      (place as any).type_icon_url = this.allPlaceTypes[place.places_type.id].icon_url;
      return place;
    });

    return places;
  }

  async preparePlaceTypes(): Promise<boolean> {
    if (!this.loadedPlaceTypes) {
      await this.loadPlaceTypes();
      this.loadedPlaceTypes = true;
    }
    if (!this.populdatedPlaceTypes) {
      await this.populatePlaceTypesWithAcceptedWastes();
      this.populdatedPlaceTypes = true;
    }

    return true;
  }

  /**
   * Description: Returns places within a bounding box coordinates
   * @param  {number} minLat
   * @param  {number} minLng
   * @param  {number} maxLat
   * @param  {number} maxLng
   * @returns Promise<Place[]>
   */
  searchPlacesWithinBox(minLat: number, minLng: number, maxLat: number, maxLng: number): Promise<Place[]> {
    let cornerPoint = this.geo.point(minLat, minLng);
    let centerPoint = this.geo.point((minLat+maxLat)/2, (minLng+maxLng)/2);


    let radius = this.geo.distance(centerPoint, cornerPoint);
    console.log(`Radius: ${radius}`);
    
    if (radius > MAX_RADIUS_SEARCH) {
      radius = RECOMENDED_RADIUS_SEARCH;
    }

    let subscription: Subscription;
    return new Promise((resolve, reject) => {
      // let places = this.firedb.collection('/places');
      let places = firebaseApp.firestore().collection(PLACE_KEY);
      subscription = this.geo.query(places).within(centerPoint, radius, 'point')
      .pipe(
        map(snap => {
          return snap.map((placeData: any) => {
            placeData.location = {
              lat: placeData.location.latitude,
              lng: placeData.location.longitude
            }
            return placeData;
          });
        })
      )
      .subscribe(docs => {
        resolve(docs);
        if (subscription) {
          subscription.unsubscribe();
        }
      });
    });
    
  }

  /**
   * Description: Computes valid place types that accept any of the wasted types
   * @param  {WasteType[]} wasteTypes
   * @returns {[plateTypeKey: string]: boolean}
   */
  getPlaceTypesForWastes(wasteTypes: WasteType[]): {[plateTypeKey: string]: boolean} {
    let validPlaces: {[plateTypeKey: string]: boolean} = {};

    let placeTypes = Object.keys(this.allPlaceTypes)
      .map(placeTypeKey => this.allPlaceTypes[placeTypeKey]);

    for (let placeType of placeTypes) {
      for (let waste of wasteTypes) {
        if (placeType.acceptedWastes.indexOf(waste.id) !== -1) {
          validPlaces[placeType.id] = true;
          break;
        }
      }
    }

    return validPlaces;
  }



  /**
   * User Story ID: M1NC2
   * Function that returns all wastes (e.g. pilas) that are located on the database. 
   * It is here because it is used on the getIDPlacesTypesByWaste function.
   * @returns Promise
   */
  public getAllWasteTypes(): Promise<any[]> {
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


  private loadPlaceTypes(): Promise<void> {
    return new Promise((resolve, reject) => {

        const subscription = this.firedb.collection<any>(PLACE_TYPE_KEY).snapshotChanges()
        .pipe(
          map(fbsnap => {
            return fbsnap.map(placeType => {
              const data  = placeType.payload.doc.data();
              const id    = placeType.payload.doc.id;
              return {id, ...data}; 
            })
          })
        )
        .subscribe((placeTypes: TipoInstalacion[]) => {
          placeTypes.forEach(placeType => {
            placeType.acceptedWastes = [];
            this.allPlaceTypes[placeType.id] = placeType;
          });

          resolve();

          if (subscription) {
            subscription.unsubscribe();
          }
        })

    });
    
  }

  private populatePlaceTypesWithAcceptedWastes(): Promise<void> {
    return new Promise((resolve, reject) => {
      const subscription = this.firedb.collection<any>(PLACE_TYPE_WASTE_TYPE).snapshotChanges()
      .pipe(
        map(fbsnap => {
          return fbsnap.map(snap => {
            return snap.payload.doc.data();
          });
        })
      )
      .subscribe((relations: any[]) => {

        relations.forEach(placeWasteRel => {
          const placeTypeId = placeWasteRel.place_type;
          const wasteTypeId = placeWasteRel.waste_type;
          this.allPlaceTypes[placeTypeId].acceptedWastes.push(wasteTypeId);
        })
        resolve();
        if (subscription) {
          subscription.unsubscribe();
        }
      })
    });
    
  }
}
