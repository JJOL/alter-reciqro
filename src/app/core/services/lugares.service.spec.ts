import { TestBed } from '@angular/core/testing';
import { AngularFirestore } from '@angular/fire/firestore';
import { LugaresService } from './lugares.service';
import { from } from 'rxjs';

const arr = [[]];

const data = from(arr);

const collectionStub = {
  valueChanges: jasmine.createSpy('valueChanges').and.returnValue(data)
}

const angularFirestoreStub = {
  collection: jasmine.createSpy('collection').and.returnValue(collectionStub)
}

describe('LugaresService', () => {
  let placeService: LugaresService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        LugaresService,
        { provide: AngularFirestore, useValue: angularFirestoreStub }
      ]
    });
    placeService = TestBed.get(LugaresService);
  });

  it('should be created', () => {
    expect(placeService).toBeTruthy();
  });

  describe('getPlacesByPosition', () => {
    it('should get places that are within radius', () => {
      const nearPlaces = placeService.getPlacesByPosition(101, 100, 5);
      expect(nearPlaces[0].idlugar).toBe("1");
    })

    it('should not include places outside radius', () => {
      
      const nearPlaces = placeService.getPlacesByPosition(101, 100, 5);
      expect(nearPlaces.find(place => place.idlugar == "2")).toBeFalsy();
    })
  });
});
