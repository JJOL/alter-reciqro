import { DualIndicatorProvider, IndicatorInstance } from './DualIndicatorProvider';
import { AngularFirestore, DocumentChangeAction } from '@angular/fire/firestore';
import { Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import * as DateUtil from '../../../core/utils/date.util';

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
export class FBSystemDualIndicatorProvider implements DualIndicatorProvider{

  constructor(
      private className: string,
      private metricName: string,
      private firedb: AngularFirestore
  ) {}
  
    instances: IndicatorInstance[];

    loadMetaData(onMetadaLoadedCb: () => void) {
      this.instances = [{
        name: 'Total',
        id: '1'
      }];
      onMetadaLoadedCb();
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
      console.log(`Start: ${lowerExclusiveDate} - End: ${upperExclusiveDate}`);

      let arrNumberOfPoints = this.getDateMonthDistance(lowerExclusiveDate, upperExclusiveDate);
      let frequencyDataArr: number[] = new Array<number>(arrNumberOfPoints);
      for (let i = 0; i < arrNumberOfPoints; i++) frequencyDataArr[i] = 0;
 
      return new Promise<number[]>((resolve, reject) => {
        this.firedb.collection<any>(PLACES_VISITS_KEY)
            .ref.where('date', '>', lowerExclusiveDate).where('date', '<', upperExclusiveDate)
            .get()
            .then(snapshot => {
              snapshot.forEach(doc => {
                let visit = doc.data();
                frequencyDataArr[this.getDateMonthDistance(lowerExclusiveDate, visit.date.toDate())] += 1;
              });
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
   * Description: Returns sorted accumulated system visited data for each month.
   * @returns Promise<{[key: string]: number}>
   */
    getOverallMetrics(): Promise<{[key: string]: number}> {

      let dataArr: { [key: string]: number } = {};
      DateUtil.getAllMonthNames().forEach( monthName => {
        dataArr[monthName] = 0;
      })

      return new Promise((resolve, reject) => {
        let subscription: Subscription;
        subscription = this.firedb.collection(PLACES_VISITS_KEY)
            .snapshotChanges()
            .pipe(map(snapshot => {
              return snapshot.map(fbsnap => fbsnap.payload.doc.data())
            }))
            .subscribe(fbvisits => {
              fbvisits.forEach(fbvisit => {
                let instanceDate: Date = fbvisit['date'].toDate();
                let monthName = DateUtil.getMonthFullName(instanceDate.getMonth());
                if (monthName)
                {dataArr[monthName] = (dataArr[monthName] + 1) || 1;}
              });

              if (subscription) {
                subscription.unsubscribe();
              }
              resolve(dataArr);
            });
      });
    }
  
}