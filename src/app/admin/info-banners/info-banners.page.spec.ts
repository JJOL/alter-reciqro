import { AuthService } from './../../core/services/auth.service';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedPageModule } from './../../shared/shared.module';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { empty, BehaviorSubject } from 'rxjs';
import { InfoBannersPage } from './info-banners.page';
import { RouterTestingModule } from '@angular/router/testing';
import { AngularFirestore } from '@angular/fire/firestore';

import { MockAngularFirestore } from '../../core/services/mocks/firestore.mock';


let mockFirestore = new MockAngularFirestore();
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

describe('InfoBannersPage', () => {
  let component: InfoBannersPage;
  let fixture: ComponentFixture<InfoBannersPage>;
  mockFirestore.setTestData(["dsad","dasd"])
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InfoBannersPage ],
      imports: [IonicModule.forRoot(), RouterTestingModule, SharedPageModule, ReactiveFormsModule],
      providers: [
        { provide: AngularFirestore, useValue: mockFirestore},
        { provide: AuthService, useValue: mockAuthentication}
      ]
    }).compileComponents();
    
    mockFirestore.setTestData([]);

    fixture = TestBed.createComponent(InfoBannersPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    
    expect(component).toBeTruthy();
  });
});
