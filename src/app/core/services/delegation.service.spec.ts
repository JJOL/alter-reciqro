import { TestBed } from '@angular/core/testing';
import {AngularFirestore} from '@angular/fire/firestore';
import { IonicModule } from '@ionic/angular';
import { DelegationService } from './delegation.service';
import { SystemService } from './system.service';

const arr = function() {};

const collectionStub3 = {
  subscribe: jasmine.createSpy('subscribe').and.returnValue(arr),
};

const collectionStub2 = {
  pipe: jasmine.createSpy('pipe').and.returnValue(collectionStub3),
};

const collectionStub = {
  snapshotChanges: jasmine.createSpy('snapshotChanges').and.returnValue(collectionStub2),
};

const angularFirestoreStub = {
  collection: jasmine.createSpy('collection').and.returnValue(collectionStub),
};

describe('DelegationService', () => {
  beforeEach(() => 
    TestBed.configureTestingModule({
      imports: [IonicModule.forRoot()],
      providers: [
        {provide: SystemService, useValue: angularFirestoreStub},
      ]
    }));

  it('should be created', () => {
    const service: DelegationService = TestBed.get(DelegationService);
    expect(service).toBeTruthy();
  });
});
