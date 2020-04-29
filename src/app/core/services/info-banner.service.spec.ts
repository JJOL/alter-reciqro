import { TestBed } from '@angular/core/testing';

import { InfoBannerService } from './info-banner.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { MockAngularFirestore } from './mocks/firestore.mock';

describe('InfoBannerService', () => {
  beforeEach(() => {

    let mockFirestore = new MockAngularFirestore();

    TestBed.configureTestingModule({
      providers: [
        { provide: AngularFirestore, useValue: mockFirestore}
      ]
    })
  });

  it('should be created', () => {
    const service: InfoBannerService = TestBed.get(InfoBannerService);
    expect(service).toBeTruthy();
  });

  it('#getAllInfoBanners() should return a list of all banners', (done: DoneFn) => {
    const service: InfoBannerService = TestBed.get(InfoBannerService);
    let mockFirestoreService: MockAngularFirestore = TestBed.get(AngularFirestore);
    mockFirestoreService.setTestData([
      {
        title: 'Nice 1'
      },
      {
        title: 'Nice 2'
      }
    ]);

    service.getAllInfoBanners()
    .then(infoBanners => {
      expect(infoBanners.length).toBe(2);
      expect(infoBanners[0].title).toBe('Nice 1');
      done();
    })
    
  });
});
