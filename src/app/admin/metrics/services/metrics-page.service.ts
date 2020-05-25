import { Injectable } from '@angular/core';
import { DualIndicatorProvider } from './DualIndicatorProvider';
import { parseFBPlaceToPlace } from 'src/app/core/services/places.service';
import { FBDualIndicatorProvider } from './FBDualIndicatorProvider';
import { parseFBPDelegationToDelegation } from 'src/app/core/services/delegation.service';
import { FBSystemDualIndicatorProvider } from './FBSystemDualIndicatorProvider';
import { SystemService } from 'src/app/core/services/system.service';

@Injectable({
  providedIn: 'root'
})
/**
 * Class: MetricsPageService
 * Description: Provides DualIndicatorProvider's
 */
export class MetricsPageService {

  // eslint-disable-next-line require-jsdoc
  constructor(
    private firedb: SystemService
  ) {}

  /**
   * User Story ID: M1NG6
   * Description: Returns a DualIndicatorProvider for Places data.
   * @returns DualIndicatorProvider
   */
  getPlacesMetricsProvider(): DualIndicatorProvider {
    return new FBDualIndicatorProvider(
        'Centros', 
        'fs', 
        {
          collectionKey: '/places',
          dbCollectionToInstancesFn: (snapshot) => {
            return snapshot.map(parseFBPlaceToPlace)
                .map(place => ({ name: place.name, id: place.id}))
          },
          idAttribute: 'place_id'
        }, this.firedb);
  }

  /**
   * User Story ID: M1NG6
   * Description: Returns a DualIndicatorProvider for Delegations data.
   * @returns DualIndicatorProvider
   */
  getDelegationsMetricsProvider(): DualIndicatorProvider {
    return new FBDualIndicatorProvider(
        'Delegaciones', 
        'fs', 
        {
          collectionKey: '/delegation',
          dbCollectionToInstancesFn: (snapshot) => {
            return snapshot.map(parseFBPDelegationToDelegation)
                .map(delegation => ({ name: delegation.name, id: delegation.id }))
          },
          idAttribute: 'user_delegation_id'
        }, this.firedb);
  }

  /**
   * User Story ID: M1NG6
   * Description: Returns a DualIndicatorProvider for System data.
   * @returns DualIndicatorProvider
   */
  getSystemMetricsProvider(): DualIndicatorProvider {
    return new FBSystemDualIndicatorProvider(
        'Sistema', 
        'fs', 
        this.firedb);
  }

}
