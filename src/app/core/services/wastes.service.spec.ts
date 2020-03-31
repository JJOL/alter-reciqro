import { TestBed } from '@angular/core/testing';
import { AngularFirestore, AngularFirestoreModule } from '@angular/fire/firestore'; 
import { WastesService } from './wastes.service';
import { AngularFireModule } from '@angular/fire';
import { environment } from '../../../environments/environment';

describe('WastesService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [ 
      AngularFireModule.initializeApp(environment.database.firebaseConfig),
      AngularFirestoreModule],
    providers: [AngularFirestore]
  }));

  it('should be created', () => {
    const service: WastesService = TestBed.get(WastesService);
    expect(service).toBeTruthy();
  });
});
