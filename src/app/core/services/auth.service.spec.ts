import { TestBed } from '@angular/core/testing';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { AuthService } from './auth.service';
import { from } from 'rxjs';
import { GeoPoint } from '../models/geopoint.model';
import { resolve } from 'url';


function placeLocToFBLoc(placeLoc) {
    return new GeoPoint(placeLoc.lat, placeLoc.lng);
  }
  
  function makeFBCollectionFromData_SnapshotChanges(testData: any[]) {
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
  
  function makeFBCollectionFromData_ValueChanges(testData: any[]) {
    const fbMockCollection = {
      doc: (id) => {
        testData = testData.filter(obj => {
          return obj.id == id;
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
  
  function makeFBCollectionFromData_Delete(testData: any[]) {
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
              return obj.id != id;
            } );
            return new Promise((resolve, reject) => {
              resolve();
            });
          }
        };
      },
    };
    return fbMockCollection;
  }
  
  describe('AuthService', () => {
  
    let placesService: AuthService;
    let mockFirestoreSpy: jasmine.SpyObj<AngularFirestore>;
  
    beforeEach(() => {
      const firestoreMockSpy = jasmine.createSpyObj('AngularFirestore', ['collection']);
  
      TestBed.configureTestingModule({
        providers: [
            AuthService,
          { provide: AngularFirestore, useValue: firestoreMockSpy }
        ],
      });
  
      placesService = TestBed.get(AuthService);
      mockFirestoreSpy = TestBed.get(AngularFirestore);
    });
  
  
    it('should be created', () => {
      expect(placesService).toBeTruthy();
    });
  
    const user1 = {
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
  

  
    
  
    
  
  });
  