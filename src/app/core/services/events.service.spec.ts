import { TestBed, async } from '@angular/core/testing';

import { EventsService } from './events.service';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { SystemService } from './system.service';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { from } from 'rxjs';
import { MockAngularFirestore } from './mocks/firestore.mock';


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

describe('EventsService', () => {
  let mockFirestoreSpy: jasmine.SpyObj<SystemService>; /*Tipo del servicio que quiero espiar o simular*/
  let eventService: EventsService;

  beforeEach(async(() => {
    const firestoreMockSpy = jasmine.createSpyObj('AngularFirestore', ['collection']);
    TestBed.configureTestingModule({
      imports: [IonicModule.forRoot(), RouterModule.forRoot([])],
      providers: [
        EventsService,
        { provide: SystemService, useValue: firestoreMockSpy },
        { provide: AngularFirestore, useValue: MockAngularFirestore }
      ]
    });
    eventService = TestBed.get(EventsService);
    mockFirestoreSpy = TestBed.get(SystemService); /*Assign mock to Service*/
  }));

  it('should be created', () => {
    const service: EventsService = TestBed.get(EventsService);
    expect(service).toBeTruthy();
  });
  const event1 = {
    id : '1', age:[], name : 'Centro Cívico', description : 'Recolección de pilas, papel y llantas',
    location: { latitude: 4, longitude: 4 },
    icon : 'none'
  };

  const event2 = {
    id : '2',age:[], name : 'Basurero Municipal', description : 'Recolección de desechos urbanos',
    location: { latitude: 5, longitude: 5 },
    qr_code : 'none', photo : 'none', address : 'Bernardo Quintana', postal_code : '12345',
    places_type : { id : '1', name : 'Papelera',  description : 'Separación de cartón'}
  };

});
