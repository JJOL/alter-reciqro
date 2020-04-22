import { AuthService } from 'src/app/core/services/auth.service';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import {AngularFirestore} from '@angular/fire/firestore';
import { UserPage } from './user.page';
import { empty } from 'rxjs';
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

const mockFirebase = {
  collection: () => {
    return {
      doc: () => { return    {valueChanges: () => {
        return {
          pipe: () => {
            return {
              subscribe: () => {}
            }
          }
        }
      }}},
   
      snapshotChanges : () => {
        return {
          pipe: () => {
            return {
              subscribe: () => {}
            }
          }
        }
      }
    }
  }
}


const mockAuthentication ={
  getCurrentUser: () => {
    return new Promise((resolve) => {
      resolve([]);
    });
  },
  registerUser: () => {
    return new Promise((resolve) => {
      resolve([]);
    });
  },
  loginEmailUser: () => {
    return new Promise((resolve) => {
      resolve([]);
    });
  },
  loginGoogleUser: () => {
    return new Promise((resolve) => {
      resolve([]);
    });
  },
  logoutUser: () => {
    return [];
  },
  isAuth:  () => {
    return empty();
  },
  updateUserData: () => {
    return [];
  },
  
};

const authStub: any = {
  authState: {},
  auth: {
    signInWithEmailAndPassword() {
      return Promise.resolve();
    }
  }
};

describe('UserPage', () => {
  let component: UserPage;
  let fixture: ComponentFixture<UserPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserPage ],
      imports: [IonicModule.forRoot()],
      providers: [
        {provide: AngularFirestore, useValue: mockFirebase},
        { provide: AuthService, useValue: mockAuthentication }
      ]
    }).compileComponents();

  fixture = TestBed.createComponent(UserPage);
  component = fixture.componentInstance;
  fixture.detectChanges();

}));

it('should create', () => {
  expect(component).toBeTruthy();
  });
});
