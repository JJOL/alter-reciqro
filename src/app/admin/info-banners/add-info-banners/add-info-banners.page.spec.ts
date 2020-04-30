import { RouterTestingModule } from '@angular/router/testing';
import { AuthService } from './../../../core/services/auth.service';
import { MockAngularFirestore } from 'src/app/core/services/mocks/firestore.mock';
import { AngularFirestore } from '@angular/fire/firestore';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedPageModule } from './../../../shared/shared.module';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { empty, BehaviorSubject } from 'rxjs';
import { AddInfoBannersPage } from './add-info-banners.page';

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
describe('AddInfoBannersPage', () => {
  let component: AddInfoBannersPage;
  let fixture: ComponentFixture<AddInfoBannersPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddInfoBannersPage ],
      imports: [IonicModule.forRoot(), SharedPageModule, ReactiveFormsModule, RouterTestingModule],
      providers: [{provide: AngularFirestore, useValue: mockFirestore},
        { provide: AuthService, useValue: mockAuthentication}]
    }).compileComponents();

    fixture = TestBed.createComponent(AddInfoBannersPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
