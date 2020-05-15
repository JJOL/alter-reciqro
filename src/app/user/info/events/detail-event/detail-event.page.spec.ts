import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { SharedPageModule } from 'src/app/shared/shared.module';
import { AuthService } from 'src/app/core/services/auth.service';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { DetailEventPage } from './detail-event.page';
import { RouterTestingModule } from '@angular/router/testing';
import { AngularFirestore } from '@angular/fire/firestore';
import { from , BehaviorSubject, empty } from 'rxjs';

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
  getUserMail: () => {
    return ;
  },
  createUser: ()=> {
    return new Promise((resolve) => {
      resolve([]);
    });
  },
  isUserLoggedIn: new BehaviorSubject(false),
  userRoles: new BehaviorSubject([]),
};
const arr = [[]];

const data = from(arr);

const collectionStub = {
  valueChanges: jasmine.createSpy('valueChanges').and.returnValue(data)
};

const angularFirestoreStub = {
  collection: jasmine.createSpy('collection').and.returnValue(collectionStub)
};

describe('DetailEventPage', () => {
  let component: DetailEventPage;
  let fixture: ComponentFixture<DetailEventPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailEventPage ],
      imports: [IonicModule.forRoot(), RouterTestingModule,SharedPageModule,ReactiveFormsModule,FormsModule],
      providers: [
        { provide: AngularFirestore, useValue: angularFirestoreStub },
        { provide: AuthService, useValue: mockAuthentication }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(DetailEventPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
