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
      data.image_url
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
}
