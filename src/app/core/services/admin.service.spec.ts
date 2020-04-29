import { TestBed, async } from '@angular/core/testing';

import { AdminService } from './admin.service';
import { AngularFirestore } from '@angular/fire/firestore';
import {MockAngularFirestore} from 'src/app/core/services/mocks/firestore.mock';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';


describe('AdminService', () => {
  beforeEach(async(() => {
    const firestoreMockSpy = jasmine.createSpyObj('AngularFirestore', ['collection']);
    TestBed.configureTestingModule({
      imports: [IonicModule.forRoot(), RouterModule.forRoot([])],
      providers: [
        AdminService,
        { provide: AngularFirestore, useValue: firestoreMockSpy },
      ]
    });
  }));

  it('should be created', () => {
    const service: AdminService = TestBed.get(AdminService);
    expect(service).toBeTruthy();
  });
});
