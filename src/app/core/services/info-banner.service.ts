import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { InfoBanner } from '../models/info-banner.model';
import { map } from 'rxjs/operators';
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
    return new Promise<any>((resolve, reject) => {
      this.firedb.collection(INFO_BANNERS_KEY).add({
        title: infoBanner.title,
        description: infoBanner.description,
        image_url: infoBanner.mainPicture,
        date: infoBanner.date
      })
          .then(
              (res) => {
                resolve(res);
              },
              err => reject(err)
          );
    });
  }
}
