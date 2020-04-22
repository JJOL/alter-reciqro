import { Injectable } from '@angular/core';
import { DualIndicatorProvider, IndicatorInstance } from './DualIndicatorProvider';
import { AngularFirestore } from '@angular/fire/firestore';
import { parseFBPlaceToPlace } from 'src/app/core/services/places.service';
import { FBDualIndicatorProvider } from './FBDualIndicatorProvider';
import { parseFBPDelegationToDelegation } from 'src/app/core/services/delegation.service';


@Injectable({
    providedIn: 'root'
})
export class MetricsPageService {

  constructor(
    private firedb: AngularFirestore
  ) {}

    getPlacesMetricsProvider(): DualIndicatorProvider {
        return new FBDualIndicatorProvider(
          "Centros", 
          "fs", 
          {
            collectionKey: "/places",
            dbCollectionToInstancesFn: (snapshot) => {
              return snapshot.map(parseFBPlaceToPlace)
                      .map(place => new PlaceIndicatorInstance(place.name, place.id))
            },
            idAttribute: 'place_id'
          }, this.firedb);
    }

    getDelegationsMetricsProvider(): DualIndicatorProvider {
      return new FBDualIndicatorProvider(
        "Delegaciones", 
        "fs", 
        {
          collectionKey: "/delegation",
          dbCollectionToInstancesFn: (snapshot) => {
            return snapshot.map(parseFBPDelegationToDelegation)
                    .map(delegation => new DelegationIndicatorInstance(delegation.name, delegation.id))
          },
          idAttribute: 'user_delegation_id'
        }, this.firedb);
  }
}

// Places
class PlaceIndicatorInstance implements IndicatorInstance {
  name: string;
  id: string;
  constructor(name: string, id: string) {
    this.name = name;
    this.id = id;
  }
}
class DelegationIndicatorInstance implements IndicatorInstance {
  name: string;
  id: string;
  constructor(name: string, id: string) {
    this.name = name;
    this.id = id;
  }
}


// const PLACES_VISITS_KEY = 'visits_places_user';
// interface IndicatorDataBridgeConfig {
//   collectionKey: string
//   dbCollectionToInstancesFn: (any) => any,
//   perInstanceBelongsFn: (any) => any
// };
// class PlacesDualIndicatorProvider implements DualIndicatorProvider{

//   constructor(
//     private className: string,
//     private metricName: string,
//     private classCollectionKey: string,
//     private dataConfig: IndicatorDataBridgeConfig,
//     private firedb: AngularFirestore
//   ) {}

//   instances: IndicatorInstance[];

//   loadMetaData(onMetadaLoadedCb: () => void) {
//     let subscription: Subscription;
//     subscription = this.firedb.collection(this.classCollectionKey)
//     .snapshotChanges()
//     .pipe(
//       map(snapshot => {
//         /* TODO: This can be a db to instances mapping function */
//         return snapshot.map(parseFBPlaceToPlace)
//                         .map(place => {
//                           return new PlaceIndicatorInstance(place.name, place.id);
//                         });
//       })
//     )
//     .subscribe(placeInstances => {
//       this.instances = placeInstances;
//       if (subscription) {
//         subscription.unsubscribe();
//       }
//       onMetadaLoadedCb();
//     });
//   }

//   getClassName(): string {
//     return this.className;
//   }
//   getMetricName(): string {
//     return this.metricName;
//   }
//   getAvailableInstances() {
//     return this.instances;
//   }
//   calculateGraphData(lowerExclusiveDate: Date, upperExclusiveDate: Date, instance: any): Promise<number[]> {
//     let arrNumberOfPoints = this.getDateMonthDistance(lowerExclusiveDate, upperExclusiveDate);
//     let frequencyDataArr: number[] = new Array<number>(arrNumberOfPoints);
//     // Implementacion hibrida
//     return new Promise<number[]>((resolve, reject) => {
//       this.firedb.collection<any>(PLACES_VISITS_KEY)
//       /* TODO: Visits Selection Criteria */
//       .ref.where('place_id', '==', instance.id)
//           .where('date', '>', lowerExclusiveDate).where('date', '<', upperExclusiveDate)
//       .get()
//       .then(snapshot => {
//         snapshot.forEach(doc => {
//           let visit = doc.data();
//           frequencyDataArr[this.getDateMonthDistance(lowerExclusiveDate, visit.date)] += 1;
//         });
//         resolve(frequencyDataArr);
//       });
//     });
//   }
//   /**
//    * @param  {Date} date
//    * @param  {Date} startDate
//    * @returns number
//    */
//   getDateMonthDistance(startDate: Date, date: Date): number {
//     let y0 = startDate.getFullYear(),
//         m0 = startDate.getMonth(),
//         y  = date.getFullYear(),        
//         m  = date.getMonth();
//     return (y - y0)*12 + (m - m0);
// }

//   getOverallMetrics() {
//     throw new Error("Method not implemented.");
//   }

// }











  // class PlaceIndicatorInstance implements IndicatorInstance {
  //   name: string;
  //   id: string;
  //   constructor(name: string, id: string) {
  //     this.name = name;
  //     this.id = id;
  //   }
  // }
  // class PlacesDualIndicatorProvider implements DualIndicatorProvider{

  //   constructor(
  //     private className: string,
  //     private metricName: string,
  //     private firedb: AngularFirestore
  //   ) {}
  
  //   instances: IndicatorInstance[] = [
  //     new PlaceIndicatorInstance("Tec de Monterrey", "1"),
  //     new PlaceIndicatorInstance("Centro DIF", "2"),
  //     new PlaceIndicatorInstance("Plaza de las Americas", "3"),
  //   ];
  //   loadMetaData(onMetadaLoadedCb: () => void) {
  //     onMetadaLoadedCb();
  //   }
  //   getClassName(): string {
  //     return this.className;
  //   }
  //   getMetricName(): string {
  //     return this.metricName;
  //   }
  //   getAvailableInstances() {
  //     return this.instances;
  //   }
  //   calculateGraphData(lowerExclusiveDate: Date, upperExclusiveDate: Date, instance: any): Promise<number[]> {
  //     return Promise.resolve([1,2,3,4,5,6,7,7,8,8,9,12,14,10,9,5,4,3,2,0])
  //   }
  //   getOverallMetrics() {
  //     throw new Error("Method not implemented.");
  //   }
  
  // }