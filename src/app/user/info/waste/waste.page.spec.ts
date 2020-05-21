import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {IonicModule} from '@ionic/angular';
import {AngularFirestore} from '@angular/fire/firestore';
import {WastePage} from './waste.page';
import {RouterModule} from '@angular/router';
import {WasteService} from 'src/app/core/services/waste.service';
import {shuffle} from './waste.page';
import { SharedPageModule } from 'src/app/shared/shared.module';
import { AuthService } from 'src/app/core/services/auth.service';
import { BehaviorSubject, empty } from 'rxjs';

const arr = function() {};

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

const mockService = jasmine.createSpyObj('wasteService', ['getWastes']);

mockService.getWastes.and.returnValue(
    new Promise<any>((res) => {
      res([]);
    }));

describe('WastePage', () => {
  let component: WastePage;
  let fixture: ComponentFixture<WastePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [WastePage],
      imports: [IonicModule.forRoot(), RouterModule.forRoot([]), SharedPageModule],
      providers: [
        {provide: AngularFirestore, useValue: angularFirestoreStub},
        {provide: WasteService, useValue: mockService},
        { provide: AuthService, useValue: mockAuthentication }
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(WastePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should shuffle array', () => {
    let testArr = [1,2,3,4,5,6,7,8,9,10];
    let copytestArr = [1,2,3,4,5,6,7,8,9,10];
    expect(shuffle(testArr)).not.toEqual(copytestArr);
  });

  it('should call get wastes from service', () => {
    const wasteService = TestBed.get(WasteService);
    component.ngOnInit();
    expect(wasteService.getWastes.calls.count()).toBeGreaterThanOrEqual(1);
  });
});
