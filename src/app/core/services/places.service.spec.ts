import { TestBed } from '@angular/core/testing';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { PlacesService } from './places.service';
import { from } from 'rxjs';
import { GeoPoint } from '../models/geopoint.model';


import { MockAngularFirestore } from './mocks/firestore.mock';

/**
 * Internal function.
 * @param  {} placeLoc
 */
function placeLocToFBLoc(placeLoc) {
  return new GeoPoint(placeLoc.lat, placeLoc.lng);
}
/**
 * User Story ID: M1NCx
 * Mock function for firebase service and data.
 * @param  {any[]} testData
 */
function makeFBCollectionFromDataSnapshotChanges(testData: any[]) {
  const fbData = testData.map(testObj => {
    return {
      payload: {
        doc: {
          data: () => testObj
        }
      }
    };
  });
  const fbMockCollection = {
    snapshotChanges: () => {
      return from([ fbData ]);
    },
    doc: () => {
      return {
        valueChanges: () => {
          return from([ fbData ]);
        },
        delete: () => {
          return from([ fbData ]);
        }
      };
    },

  };
  return fbMockCollection;
}
/**
 * User Story ID: M1NCx
 * Mock function for firebase service and data.
 * @param  {any[]} testData
 */
function makeFBCollectionFromDataValueChanges(testData: any[]) {
  const fbMockCollection = {
    doc: (id) => {
      testData = testData.filter(obj => {
        return obj.id === id;
      } );
      return {
        valueChanges: () => {
          return from( testData );
        }
      };
    },

  };
  return fbMockCollection;
}
/**
 * User Story ID: M1NCx
 * Mock function for firebase service and data.
 * @param  {any[]} testData
 */
function makeFBCollectionFromDataDelete(testData: any[]) {
  let functionData = [...testData];
  const fbMockCollection = {
    snapshotChanges: () => {
      const fbData = functionData.map(testObj => {
        return {
          payload: {
            doc: {
              data: () => testObj
            }
          }
        };
      });
      return from([ fbData ]);
    },
    doc: (id) => {
      return {
        delete: () => {
          functionData = functionData.filter(obj => {
            return obj.id !== id;
          } );
          return new Promise((resolve) => {
            resolve();
          });
        }
      };
    },
  };
  return fbMockCollection;
}

describe('PlacesService', () => {

  let placesService: PlacesService;
  let mockFirestoreSpy: jasmine.SpyObj<AngularFirestore>;

  beforeEach(() => {
    const firestoreMockSpy = jasmine.createSpyObj('AngularFirestore', ['collection']);

    TestBed.configureTestingModule({
      providers: [
        PlacesService,
        { provide: AngularFirestore, useValue: firestoreMockSpy }
      ],
    });

    placesService = TestBed.get(PlacesService);
    mockFirestoreSpy = TestBed.get(AngularFirestore);
  });


  it('should be created', () => {
    expect(placesService).toBeTruthy();
  });

  const place1 = {
    id : '1', name : 'Centro Cívico', description : 'Recolección de pilas, papel y llantas',
    location: { latitude: 4, longitude: 4 },
    qr_code : 'none', photo : 'none', address : 'Centro Cívico', postal_code : '76146',
    places_type : { id : '1', name : 'Papelera',  description : 'Separación de cartón'}
  };

  const place2 = {
    id : '2', name : 'Basurero Municipal', description : 'Recolección de desechos urbanos',
    location: { latitude: 5, longitude: 5 },
    qr_code : 'none', photo : 'none', address : 'Bernardo Quintana', postal_code : '12345',
    places_type : { id : '1', name : 'Papelera',  description : 'Separación de cartón'}
  };
  
  /**
   * User Story ID: M1NG4
   * Description: This function tests that all places are returned
   * @param  {} '#getAllPlacesshouldreturnallPlaces'
   * @param  {} function(done
   */
  it('#getAllPlaces should return all Places', function(done) {
    // Test Data Setup
    const testData = [place1, place2];
    mockFirestoreSpy.collection.and.returnValue(makeFBCollectionFromDataSnapshotChanges(testData) as unknown as AngularFirestoreCollection);
    // Execute Function
    placesService.getAllPlaces()
        .then(places => {
          // Verify Results
          expect(places.length).toBe(2);
          expect(places[0].name).toBe('Centro Cívico');
          done();
        });
  });

  /**
   * User Story ID: M1NG5
   * Description: This function test that a specific place is obtained
   * @param  {} '#getPlaceByIDshouldreturnaPlaceifitexists'
   * @param  {} function(done
   */
  it('#getPlaceByID should return a Place if it exists', function(done) {
    // Test Data Setup
    const testData = [place1, place2];
    let fsMock = new MockAngularFirestore();
    fsMock.setTestData(testData);
    //mockFirestoreSpy.collection.and.returnValue(makeFBCollectionFromDataValueChanges(testData) as unknown as AngularFirestoreCollection);
    mockFirestoreSpy.collection.and.returnValue(fsMock.collection('test') as unknown as AngularFirestoreCollection);
    // Execute Function
    placesService.getPlaceByID('2')
        .then(place => {
          // Verify Results
          expect(place.name).toBe('Basurero Municipal');
          done();
        });
  });
  
  /**
   * User Story ID: M1NG3
   * Description: This function test that a place is deleted
   * @param  {} '#deletePlaceByIDshoulddeleteaPlaceifitexists'
   * @param  {} function(done
   */
  it('#deletePlaceByID should delete a Place if it exists', function(done) {
    // Test Data Setup
    const testData = [place1, place2];
    mockFirestoreSpy.collection.and.returnValue(makeFBCollectionFromDataDelete(testData) as unknown as AngularFirestoreCollection);
    // Execute Function
    placesService.deletePlaceByID('1')
        .then(() => {
          // Verify Results
          placesService.getAllPlaces().then (lugares => {
            expect(lugares.length).toBe(1);
            done ();
          });
        });
  });

  it('#searchMapPlaces should return Places within query location range', function(done) {
    // Test Data Setup
    const ne = { lat: 40, lng: 120 };
    const sw = { lat: -40, lng: 40 };
    const p1 = new GeoPoint(34, 100),
      p2 = new GeoPoint(50, 100),
      p3 = new GeoPoint(-1, 42);
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
    mockFirestoreSpy.collection.and.returnValue(makeFBCollectionFromDataSnapshotChanges(testData) as unknown as AngularFirestoreCollection);

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
      p2 = new GeoPoint(50, 100),
      p3 = new GeoPoint(-1, 42);
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
    mockFirestoreSpy.collection.and.returnValue(makeFBCollectionFromDataSnapshotChanges(testData) as unknown as AngularFirestoreCollection);

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
    mockFirestoreSpy.collection.and.returnValue(makeFBCollectionFromDataSnapshotChanges(testData) as unknown as AngularFirestoreCollection);

    // Execute Function
    placesService.searchMapPlaces(ne, sw)
        .then(() => {
          // Verify Results
          expect(mockFirestoreSpy.collection.calls.count()).toBe(1);
          done();
        });
  });

});
