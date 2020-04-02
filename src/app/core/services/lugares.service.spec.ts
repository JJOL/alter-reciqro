import { TestBed } from '@angular/core/testing';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { LugaresService } from './lugares.service';
import { from } from 'rxjs';
import { GeoPoint } from '../models/geopoint.model';

// const arr = [[]];
// const data = from(arr);
// const collectionStub = {
//   valueChanges: jasmine.createSpy('valueChanges').and.returnValue(data),
// }
// const angularFirestoreStub = {
//   collection: jasmine.createSpy('collection').and.returnValue(collectionStub)
// }


function placeLocToFBLoc(placeLoc) {
  return new GeoPoint(placeLoc.lat, placeLoc.lng);
}

function makeFBCollectioFromData(testData: any[]) {
  let fbData = testData.map(testObj => {
    return {
      payload: {
        doc: {
          data: () => testObj
        }
      }
    };
  })
  const fbMockCollection = {
    snapshotChanges: () => {
      return from([ fbData ]);
    }
  };
  return fbMockCollection;
}

describe('LugaresService', () => {
  
  let placesService: LugaresService;
  let mockFirestoreSpy: jasmine.SpyObj<AngularFirestore>; 

  beforeEach(() => {
    const firestoreMockSpy = jasmine.createSpyObj('AngularFirestore', ['collection']);

    TestBed.configureTestingModule({
      providers: [
        LugaresService,
        { provide: AngularFirestore, useValue: firestoreMockSpy }
      ],
    });

    placesService = TestBed.get(LugaresService);
    mockFirestoreSpy = TestBed.get(AngularFirestore);
  });


  it('should be created', () => {
    expect(placesService).toBeTruthy();
  });

  it('#getAllPlaces should return all Places', (done: DoneFn) => {
    // Test Data Setup
    const p1 = {
      id : "1",
      name : "Centro Cívico", 
      description : "Recolección de pilas, papel y llantas",
      location: {
        latitude: 4,
        longitude: 4
      },
      qr_code : "none",
      photo : "none",
      address : "Centro Cívico",
      postal_code : "76146",
      places_type : {
        id : "1",
        name : "Papelera",
        description : "Separación de cartón"
      }
    };
    const testData = [p1];
    
    mockFirestoreSpy.collection.and.returnValue(makeFBCollectioFromData(testData) as unknown as AngularFirestoreCollection);

    // Execute Function
    placesService.getAllPlaces()
    .then(lugares => {
      // Verify Results
      expect(lugares.length).toBe(1);
      done();
    });
  });

  it('#searchMapPlaces should return Places within query location range', (done: DoneFn) => {
    // Test Data Setup
    const ne = { lat: 40, lng: 120 };
    const sw = { lat: -40, lng: 40 };
    const p1 = new GeoPoint(34, 100),
          p2 = new GeoPoint(50,100),
          p3 = new GeoPoint(-1,42);
    const testData = [
      {
        location: p1
      },
      {
        location: p2
      },
      {
        location: p3
      },
    ];
    mockFirestoreSpy.collection.and.returnValue(makeFBCollectioFromData(testData) as unknown as AngularFirestoreCollection);

    // Execute Function
    placesService.searchMapPlaces(ne, sw)

    .then(lugares => {
      // Verify Results
      expect(placeLocToFBLoc(lugares[0].location)).toEqual(p1);
      expect(placeLocToFBLoc(lugares[1].location)).toEqual(p3);
      done();
    });
  });

  it('#searchMapPlaces should not return Places within query location range', (done: DoneFn) => {
    // Test Data Setup
    const ne = { lat: 40, lng: 120 };
    const sw = { lat: -40, lng: 40 };
    const p1 = new GeoPoint(34, 100),
          p2 = new GeoPoint(50,100),
          p3 = new GeoPoint(-1,42);
    const testData = [
      {
        location: p1
      },
      {
        location: p2
      },
      {
        location: p3
      },
    ];
    mockFirestoreSpy.collection.and.returnValue(makeFBCollectioFromData(testData) as unknown as AngularFirestoreCollection);

    // Execute Function
    placesService.searchMapPlaces(ne, sw)

    .then(lugares => {
      // Verify Results
      expect(lugares.find(lugar => placeLocToFBLoc(lugar.location).isEqual(p2))).toBeFalsy();
      done();
    });
  });

  it('#searchMapPlaces should call Firestore.collection() once', (done: DoneFn) => {
    // Test Data Setup
    const ne = { lat: 40, lng: 120 };
    const sw = { lat: -40, lng: 40 };
    const testData = [];
    mockFirestoreSpy.collection.and.returnValue(makeFBCollectioFromData(testData) as unknown as AngularFirestoreCollection);

    // Execute Function
    placesService.searchMapPlaces(ne, sw)
    .then(_ => {
      // Verify Results
      expect(mockFirestoreSpy.collection.calls.count()).toBe(1);
      done();
    });
  });

});
