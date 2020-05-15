import { SharedPageModule } from 'src/app/shared/shared.module';
import { AuthService } from 'src/app/core/services/auth.service';
import { BehaviorSubject, empty } from 'rxjs';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { RouterTestingModule } from '@angular/router/testing';
import { CenterPage } from './center.page';
import { AngularFirestore } from '@angular/fire/firestore';
import {MockAngularFirestore} from 'src/app/core/services/mocks/firestore.mock';
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


describe('CenterPage', () => {
  let component: CenterPage;
  let fixture: ComponentFixture<CenterPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CenterPage ],
      imports: [IonicModule.forRoot(), RouterTestingModule,SharedPageModule],
      providers: [
        { provide: AngularFirestore, useValue: MockAngularFirestore },
        { provide: AuthService, useValue: mockAuthentication}
      ]
    }).compileComponents();
 
    fixture = TestBed.createComponent(CenterPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
