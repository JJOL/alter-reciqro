import { TestBed, async } from '@angular/core/testing';
import { SharedPageModule } from 'src/app/shared/shared.module';
import { WasteService } from './waste.service';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { from } from 'rxjs';

const waste1 = {
  id : '1', name : 'Pilas', description : 'Recolección de pilas', icon : 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d6/General_Motors_logo.svg/1200px-General_Motors_logo.svg.png'
};

const waste2 = {
  id : '2', name : 'Llantas', description : 'Recolección de llantas', icon : 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d6/General_Motors_logo.svg/1200px-General_Motors_logo.svg.png'
};

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


describe('WasteService', () => {
  let mockFirestoreSpy: jasmine.SpyObj<AngularFirestore>; /*Tipo del servicio que quiero espiar o simular*/
  let wasteService: WasteService;

  beforeEach(async(() => {
    const firestoreMockSpy = jasmine.createSpyObj('AngularFirestore', ['collection']);
    TestBed.configureTestingModule({
      imports: [IonicModule.forRoot(), SharedPageModule, RouterModule.forRoot([])],
      providers: [
        WasteService,
        { provide: AngularFirestore, useValue: firestoreMockSpy },
      ]
    });
    wasteService = TestBed.get(WasteService);
    mockFirestoreSpy = TestBed.get(AngularFirestore); /*Assign mock to Service*/
  }));

  it('should be created', () => {
      const service: WasteService = TestBed.get(WasteService);
      expect(service).toBeTruthy();
    });

  it('#getAllWastes should return all wastes', function(done) {
      // Test Data Setup
      const testData = [waste1, waste2];
      mockFirestoreSpy.collection.and.returnValue(makeFBCollectionFromData_SnapshotChanges(testData) as unknown as AngularFirestoreCollection);
      // Execute Function
      wasteService.getWastes()
      .then(wastes => {
        // Verify Results
        expect(wastes.length).toBe(2);
        expect(wastes[0].name).toBe('Pilas');
        done();
      });
    });

});
