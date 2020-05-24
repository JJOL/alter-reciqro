import { TestBed } from '@angular/core/testing';

import { PlacesSearchService } from './places-search.service';
import { SystemService } from './system.service';
import { MockAngularFirestore } from './mocks/firestore.mock';

describe('PlacesSearchService', () => {
  beforeEach(() => {
    let mockFirestore = new MockAngularFirestore();
    TestBed.configureTestingModule({
      providers: [
        { provide: SystemService, useValue: mockFirestore}
      ]
    });
  });

  it('should be created', () => {
    const service: PlacesSearchService = TestBed.get(PlacesSearchService);
    expect(service).toBeTruthy();
  });
});
