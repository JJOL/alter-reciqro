import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { InfoPage } from './info.page';
import { SharedPageModule } from 'src/app/shared/shared.module';
import { RouterModule } from '@angular/router';
import { BehaviorSubject, empty } from 'rxjs';
import { AngularFireAuth } from 'angularfire2/auth';
import { AuthService } from 'src/app/core/services/auth.service';


const authStub: any = {
  authState: {},
  auth: {
    signInWithEmailAndPassword() {
      return Promise.resolve();
    }
  }
};


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

describe('InfoPage', () => {
  let component: InfoPage;
  let fixture: ComponentFixture<InfoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InfoPage ],
      imports: [IonicModule.forRoot(), RouterModule.forRoot([]), SharedPageModule],
      providers: [
        { provide: AngularFireAuth, useValue: authStub },
        { provide: AuthService, useValue: mockAuthentication }]
    }).compileComponents();

    fixture = TestBed.createComponent(InfoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
