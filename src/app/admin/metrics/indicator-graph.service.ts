import { Injectable } from '@angular/core';
import { Place } from 'src/app/core/models/place.model';
import { AngularFirestore } from '@angular/fire/firestore';


@Injectable({
    providedIn: 'root'
})
export class IndicatorGraphService {


    constructor(
        // private firedb: AngularFirestore
    ) {}


    loadInstances(loadCb: Function) {
        loadCb(['Monterrey', 'DIF', 'Pueblito']);
    }
     

    // calculateOutputData(lowerExclusiveDate: Date, upperExclusiveDate: Date, instance: Place) {

    //     let arrNumberOfPoints = this.getDateMonthDistance(lowerExclusiveDate, upperExclusiveDate);
    //     let frequencyDataArr: number[] = new Array<number>(arrNumberOfPoints);

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

    //     // Implementacion hibrida
    //     return new Promise<number[]>((resolve, reject) => {
    //         this.firedb.collection<any>('visits_places_user')
    //         .ref.where('place_id', '==', instance.id)
    //             .where('date', '>', lowerExclusiveDate).where('date', '<', upperExclusiveDate)
    //         .get()
    //         .then(snapshot => {
    //             snapshot.forEach(doc => {
    //                 let visit = doc.data();
    //                 frequencyDataArr[this.getDateMonthDistance(lowerExclusiveDate, visit.date)] += 1;
    //             });
    //             resolve(frequencyDataArr);
    //         });
    //     });

        
    // }



    // getMonthsBetweenExclusiveDates(lowerDate: Date, upperDate: Date): number {
    //     let upYear  = upperDate.getFullYear(),
    //         lowYear = lowerDate.getFullYear();
    //     let upMonth  = upperDate.getMonth(),
    //         lowMonth = lowerDate.getMonth(),;
        
    //     let yearDiff = upYear - lowYear;

    //     return (yearDiff * 12) + (upMonth - lowMonth);
    // }

    
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

    // isExclusiveBetween(date: Date, lowerExclusiveDate: Date, upperExclusiveDate: Date) {
    //     return lowerExclusiveDate.getTime() < date.getTime()
    //         && date.getTime() < upperExclusiveDate.getTime();
    // }


}