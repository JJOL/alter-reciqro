import { DualIndicatorProvider, IndicatorInstance } from './DualIndicatorProvider';
import { AngularFirestore, DocumentChangeAction } from '@angular/fire/firestore';
import { Subscription } from 'rxjs';
import { map } from 'rxjs/operators';

export interface IndicatorDataBridgeConfig {
    collectionKey: string
    dbCollectionToInstancesFn: (snapshot: DocumentChangeAction<unknown>[]) => IndicatorInstance[],
    idAttribute: string
  };
const PLACES_VISITS_KEY = 'visited_places_users';
export class FBDualIndicatorProvider implements DualIndicatorProvider{

    constructor(
      private className: string,
      private metricName: string,
      private dataConfig: IndicatorDataBridgeConfig,
      private firedb: AngularFirestore
    ) {}
  
    instances: IndicatorInstance[];

    loadMetaData(onMetadaLoadedCb: () => void) {
      let subscription: Subscription;
      subscription = this.firedb.collection(this.dataConfig.collectionKey)
      .snapshotChanges()
      .pipe(
        map(this.dataConfig.dbCollectionToInstancesFn)
      )
      .subscribe(placeInstances => {
        this.instances = placeInstances;
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
      let arrNumberOfPoints = this.getDateMonthDistance(lowerExclusiveDate, upperExclusiveDate);
      let frequencyDataArr: number[] = new Array<number>(arrNumberOfPoints);
      for (let i = 0; i < arrNumberOfPoints; i++) frequencyDataArr[i] = 0;

      lowerExclusiveDate.setDate(28);
      
      console.log('GOING TO CALCULATE DATA FOR GIVEN PAREMENTERS:');
      console.log(`Instance Name: ${instance.name}`);
      console.log(`Start: ${lowerExclusiveDate} - End: ${upperExclusiveDate}`);
      console.log(`Lookup Id Attribute: ${this.dataConfig.idAttribute}`);
      
 
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

    getOverallMetrics() {
      throw new Error("Method not implemented.");
    }
  
  }