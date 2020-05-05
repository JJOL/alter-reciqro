import { DualIndicatorProvider, IndicatorInstance } from './DualIndicatorProvider';
import { AngularFirestore, DocumentChangeAction } from '@angular/fire/firestore';
import { Subscription } from 'rxjs';
import { map } from 'rxjs/operators';

const PLACES_VISITS_KEY = 'visited_places_users';

/**
 * Interface: IndicatorDataBridgeConfig
 * Description: Data configuration parameters for FBDualIndicatorProvider.
 */
export interface IndicatorDataBridgeConfig {
    collectionKey: string
    dbCollectionToInstancesFn: (snapshot: DocumentChangeAction<unknown>[]) => IndicatorInstance[],
    idAttribute: string
  };

/**
 * Class: FBDualIndicatorProvider
 * Description: A concrete implementation of a DualIndicatorProvider that works with FireStore
 */
export class FBDualIndicatorProvider implements DualIndicatorProvider{
  
  instances: IndicatorInstance[];
  instanceIdNameMap: { [key: string]: string };

  constructor(
      private className: string,
      private metricName: string,
      private dataConfig: IndicatorDataBridgeConfig,
      private firedb: AngularFirestore
  ) {}
  
  loadMetaData(onMetadaLoadedCb: () => void) {
    let subscription: Subscription;
    subscription = this.firedb.collection(this.dataConfig.collectionKey)
        .snapshotChanges()
        .pipe(
            map(this.dataConfig.dbCollectionToInstancesFn)
        )
        .subscribe(placeInstances => {
          // Set Meta Data
          this.instances = placeInstances;
          this.instanceIdNameMap = {};
          for (let inst of this.instances) {
            this.instanceIdNameMap[inst.id] = inst.name;
          }

          if (subscription) {
            subscription.unsubscribe();
          }
          onMetadaLoadedCb();
        });
  }

  getClassName(): string {
    return this.className;
  }
  getMetricName(): string {
    return this.metricName;
  }
  getAvailableInstances() {
    return this.instances;
  }
  calculateGraphData(lowerExclusiveDate: Date, upperExclusiveDate: Date, instance: IndicatorInstance): Promise<number[]> {
    console.log('GOING TO CALCULATE DATA FOR GIVEN PAREMENTERS:');
    console.log(`Instance Name: ${instance.name}`);
    console.log(`Start: ${lowerExclusiveDate} - End: ${upperExclusiveDate}`);
    console.log(`Lookup Id Attribute: ${this.dataConfig.idAttribute}`);
    let arrNumberOfPoints = this.getDateMonthDistance(lowerExclusiveDate, upperExclusiveDate);
    let frequencyDataArr: number[] = new Array<number>(arrNumberOfPoints);
    for (let i = 0; i < arrNumberOfPoints; i++) frequencyDataArr[i] = 0;

    lowerExclusiveDate.setDate(28);
      
      
 
    return new Promise<number[]>((resolve, reject) => {
      this.firedb.collection<any>(PLACES_VISITS_KEY)
          .ref.where(this.dataConfig.idAttribute, '==', instance.id)
          .where('date', '>', lowerExclusiveDate).where('date', '<', upperExclusiveDate)
          .get()
          .then(snapshot => {
            snapshot.forEach(doc => {
              let visit = doc.data();
              frequencyDataArr[this.getDateMonthDistance(lowerExclusiveDate, visit.date.toDate())] += 1;
            });
            console.log('Calculated Data:');
          
            console.log(frequencyDataArr);
          
            resolve(frequencyDataArr);
          });
    });
  }
  /**
     * @param  {Date} date
     * @param  {Date} startDate
     * @returns number
     */
  getDateMonthDistance(startDate: Date, date: Date): number {
    let y0 = startDate.getFullYear(),
      m0 = startDate.getMonth(),
      y  = date.getFullYear(),        
      m  = date.getMonth();
    return (y - y0)*12 + (m - m0);
  }
  /**
     * User Story ID: M1NG6
     * Description: Returns sorted accumulated visited data for each instance.
     * @returns Promise<{[key: string]: number}>
     */
  getOverallMetrics(): Promise<{[key: string]: number}> {

    let dataArr: { [key: string]: number } = {};
    this.instances.forEach( inst => { dataArr[inst.name] = 0; })

    return new Promise((resolve, reject) => {
      let subscription: Subscription;
      subscription = this.firedb.collection(PLACES_VISITS_KEY)
          .snapshotChanges()
          .pipe(map(snapshot => {
            return snapshot.map(fbsnap => fbsnap.payload.doc.data())
          }))
          .subscribe(fbvisits => {
            fbvisits.forEach(fbvisit => {
              let instanceId = fbvisit[this.dataConfig.idAttribute];
              let instanceName = this.instanceIdNameMap[instanceId];
              if (instanceName)
              {dataArr[instanceName] = (dataArr[instanceName] + 1) || 1;}
            });


            if (subscription) {
              subscription.unsubscribe();
            }
            resolve(dataArr);
          });
    });
  }
  
}

//     // Implementation Using Firestore Queries
//     let startDate = new Date(lowerExclusiveDate);
//     let promisesArray: Promise<any>[] = [];
//     for (let i = 0; i < arrNumberOfPoints; i++) {

//         let nextDate = new Date(startDate);
//         nextDate.setMonth(startDate.getMonth()+1);

//         promisesArray.push(
//         this.firedb.collection('visits_places_user').ref
//             .where('place_id', '==', instance.id)      // TODO: Hacer chequeo dinamico dependiendo del tipo de instancia
//             .where('date', '>', startDate).where('date', '<', nextDate)
//             .get()
//             .then(snapshot => {
//                 frequencyDataArr[i] = snapshot.size;
//             }));

//         startDate = nextDate;
//     } 
//     return Promise.all(promisesArray).then(() => frequencyDataArr);
        
//     // Implementacion pura usando logica avida
//     // return new Promise<number[]>((resolve, reject) => {
//     //     this.firedb.collection<any>('visits_places_user').snapshotChanges()
//     //     .subscribe(snapshot => {
//     //         snapshot
//     //         .map(el => el.payload.doc.data())
//     //         .forEach(visit => {
//     //             if (visit.place_id == instance.id && this.isExclusiveBetween(visit.date, lowerExclusiveDate, upperExclusiveDate)) {
//     //                 frequencyDataArr[this.getDateMonthDistance(lowerExclusiveDate, visit.date)] += 1;
//     //             }
//     //         })
//     //         resolve(frequencyDataArr);
//     //     });
//     // });