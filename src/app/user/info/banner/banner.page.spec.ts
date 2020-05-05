import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { BannerPage } from './banner.page';
import { RouterTestingModule } from '@angular/router/testing';
import { MockAngularFirestore } from 'src/app/core/services/mocks/firestore.mock';
import { AngularFirestore } from '@angular/fire/firestore';
import { SharedPageModule } from '../../../shared/shared.module';
import { AuthService } from '../../../core/services/auth.service';
import { empty, BehaviorSubject } from 'rxjs'


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

describe('BannerPage', () => {
  let component: BannerPage;
  let fixture: ComponentFixture<BannerPage>;
  let mockFirestore = new MockAngularFirestore();
  mockFirestore.setTestData(["dsad","dasd"])

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BannerPage ],
      imports: [IonicModule.forRoot(), RouterTestingModule, SharedPageModule],
      providers: [
        { provide: AngularFirestore, useValue: mockFirestore },
        { provide: AuthService, useValue: mockAuthentication}
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(BannerPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
