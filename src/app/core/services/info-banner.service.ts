import { Injectable } from '@angular/core';
import { AngularFirestore, DocumentSnapshot } from '@angular/fire/firestore';
import { InfoBanner } from '../models/info-banner.model';
import { map, take } from 'rxjs/operators';
import { Subscription } from 'rxjs';

const INFO_BANNERS_KEY = 'info_banners';

/**
 * Description: Parses Firebase Snapshot InfoBanner to InfoBanner Model.
 * @param  {any} fbInfoBannerSnap
 * @returns InfoBanner
 */
function fbInfoBannerSnapToInfoBanner(fbInfoBannerSnap: any): InfoBanner {
  const data  = fbInfoBannerSnap.payload.doc.data();
  const id = fbInfoBannerSnap.payload.doc.id;

  const infoBanner = new InfoBanner(
      id,
      data.title,
      data.description,
      data.image_url,
      data.date
  );

  return infoBanner;
}

@Injectable({
  providedIn: 'root'
})
/**
 * InfoBannerService
 * Description: Manages InfoBanner State
 */
export class InfoBannerService {

  // eslint-disable-next-line require-jsdoc
  constructor(
    private firedb: AngularFirestore
  ) { }
  /**
   * User Story ID: M1NG6
   * Description: Returns a list of Info Banners from database
   * @returns Promise<InfoBanner[]>
   */
  getAllInfoBanners(): Promise<InfoBanner[]> {
    return new Promise((res, rej) => {
      let subscription: Subscription;
      subscription = this.firedb.collection(INFO_BANNERS_KEY)
          .snapshotChanges()
          .pipe(
              map(snapshot => {
                return snapshot.map(fbInfoBannerSnapToInfoBanner)
              })
          )
          .subscribe(infoBanners => {
            if (subscription) {
              subscription.unsubscribe();
            }
            res(infoBanners);
          });
    });
  }
  /**
   * Delete info banners
   * @param  {string} id
   */
  async deleteInfoBannersByID(id: string): Promise<void> {
    return new Promise((resolve) => {
      this.firedb.collection<InfoBanner>(INFO_BANNERS_KEY).doc<InfoBanner>(id).delete().then(() => {
        resolve();
      });
    });
  }

  /**
   * User Story ID: M2NG8
   * Description: This function creates a place in firebase
   * @param  {} infoBanner
   */
  createInfoBanner(infoBanner) {
    let arg: string[] = infoBanner.date.split('T');
    return new Promise<any>((resolve, reject) => {
      this.firedb.collection(INFO_BANNERS_KEY).add({
        title: infoBanner.title,
        description: infoBanner.description,
        image_url: infoBanner.mainPicture,
        date: arg[0]
      })
          .then(
              (res) => {
                resolve(res);
              },
              err => reject(err)
          );
    });
  }

  /**
   * User Story ID: M4NG10
   * Function that returns a specific info banner on the database, filtered by its id, with all its associated data.
   * @param  {string} id
   * @returns Promise
   */
  getInfoBannerByID(id: string): Promise<InfoBanner> {
    return new Promise((resolve) => {
      let subscription: Subscription;
      subscription = this.firedb.collection<any>(INFO_BANNERS_KEY).doc<any>(id).valueChanges()
          .pipe(
              // eslint-disable-next-line @typescript-eslint/no-magic-numbers
              take(1),
              map(info => {return info}))
          .subscribe(info => {
            if (subscription) {
              subscription.unsubscribe();
            }
            resolve(info);
          });
    });
  }

  /**
   * User Story ID: M2NG10
   * This function edits a info banner
   * @param  {string} id
   * @returns Promise
   */
  editInfoBanner(infoBanner, id: string) {
    let arg: string[] = infoBanner.date.split('T');
    return new Promise<any>((resolve, reject) => {
      this.firedb.collection(INFO_BANNERS_KEY).doc(id).set({
        title: infoBanner.title,
        description: infoBanner.description,
        date: arg[0],
        image_url: infoBanner.mainPicture
      }, {merge: true} )
          .then(
              (res) => {
                resolve(res);
              },
              err => reject(err)
          );
    });
  }


  /**
   * User Story ID: M2NC4
   * This function retrives all the banner of an specific date
   * @param  {string} id
   * @returns Promise
   */
   getBannerofDay(date: string): Promise<InfoBanner[]> {
    return new Promise((resolve) => {
      let subscription: Subscription;
      subscription = this.firedb.collection<any>(INFO_BANNERS_KEY, ref => ref.where('date', '==', date)).snapshotChanges()
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

}
