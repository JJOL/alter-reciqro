import { TestBed } from '@angular/core/testing';

import { VisitsService } from './visits.service';
import { PlacesService } from 'src/app/core/services/places.service';
import { AuthService } from 'src/app/core/services/auth.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { MockAngularFirestore } from 'src/app/core/services/mocks/firestore.mock';
import { Place } from 'src/app/core/models/place.model';
import { SystemService } from 'src/app/core/services/system.service';



describe('VisitsService', () => {

  let placesMock: jasmine.SpyObj<PlacesService>;
  let authMock: jasmine.SpyObj<AuthService>;
  let fireMock: MockAngularFirestore;

  beforeEach(() => {
    placesMock = jasmine.createSpyObj('PlacesService', ['getPlaceByID']);
    authMock = jasmine.createSpyObj('AuthService', ['getCurrentUser']);
    fireMock = new MockAngularFirestore();

    TestBed.configureTestingModule({
      providers: [
        { provide: PlacesService, useValue: placesMock },
        { provide: AuthService, useValue: authMock },
        { provide: SystemService, useValue: fireMock }
      ]
    });
  });

  it('should be created', () => {
    const service: VisitsService = TestBed.get(VisitsService);
    expect(service).toBeTruthy();
  });
});
