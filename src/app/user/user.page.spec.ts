import { ReactiveFormsModule } from '@angular/forms';
import { SharedPageModule } from './../shared/shared.module';
import { AuthService } from 'src/app/core/services/auth.service';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule, ToastController } from '@ionic/angular';
import {AngularFirestore} from '@angular/fire/firestore';
import { UserPage } from './user.page';
import { empty, BehaviorSubject } from 'rxjs';
import { RouterModule } from '@angular/router';
import { MockAngularFirestore } from '../core/services/mocks/firestore.mock';
import { DelegationService } from '../core/services/delegation.service';
import { create } from 'domain';

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
  getCurrentUser : () => {
    return new Promise((resolve) => {
      resolve([]);
    });
  },
  updateCurrentUser: () => {
    return new Promise((resolve) => {
      resolve([]);
    });
  },
  sendPasswordResetEmail: () => {
    return new Promise((resolve) => {
      resolve([]);
    });
  },
  updateUserByUID: () => {
    return [];
  },
  getUserByUID: () => {
    return new Promise((resolve) => {
      resolve([]);
    });
  },
  createUser: ()=> {
    return new Promise((resolve) => {
      resolve([]);
    });
  },
  isUserLoggedIn: new BehaviorSubject(false),
  userRoles: new BehaviorSubject([]),
};

const authStub: any = {
  authState: {},
  auth: {
    signInWithEmailAndPassword() {
      return Promise.resolve();
    }
  }
};

const mockService = jasmine.createSpyObj('delegationService', ['getDelegationByID', 'getDelegations']);

mockService.getDelegationByID.and.returnValue(
    new Promise<any>((res) => {
      res([]);
    }));

mockService.getDelegations.and.returnValue(
    new Promise<any>((res) => {
      res([]);
    }));

//const mockComponent = jasmine.createSpy('UserPage', ['showToast']);

describe('UserPage', () => {
  let component: UserPage;
  let fixture: ComponentFixture<UserPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserPage ],
      imports: [IonicModule.forRoot(), RouterModule.forRoot([]),SharedPageModule,ReactiveFormsModule],
      providers: [
        {provide: AngularFirestore, useValue: mockFirebase},
        { provide: AuthService, useValue: mockAuthentication },
        { provide: AngularFirestore, useValue: MockAngularFirestore },
        { provide: DelegationService, useValue: mockService }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(UserPage);
    component = fixture.componentInstance;
    fixture.detectChanges();

  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should retrieve delegation by ID on change', () => {
    const delegationServiceTest = TestBed.get(DelegationService);
    component.changeDelegation('3eexhXv3f8gQ80rPjPCI');
    expect(delegationServiceTest.getDelegationByID.calls.count()).toBeGreaterThanOrEqual(1);
  });

  it('should retrieve delegation by id on init', () => {
    const delegationServiceTest = TestBed.get(DelegationService);
    component.ionViewWillEnter();
    expect(delegationServiceTest.getDelegationByID.calls.count()).toBeGreaterThanOrEqual(1);
  });

  it('should retrieve all delegations', () => {
    const delegationServiceTest = TestBed.get(DelegationService);
    component.ionViewWillEnter();
    expect(delegationServiceTest.getDelegations.calls.count()).toBeGreaterThanOrEqual(1);
  });

});
