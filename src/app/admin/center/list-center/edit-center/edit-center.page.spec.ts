import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { RouterTestingModule } from '@angular/router/testing';
import { EditCenterPage } from './edit-center.page';

import { AngularFirestore } from '@angular/fire/firestore';
import { ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { PlacesService } from 'src/app/core/services/places.service';
import { AuthService } from '../../../../core/services/auth.service';
import { SharedPageModule } from 'src/app/shared/shared.module';
import { BehaviorSubject, empty } from 'rxjs';


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


const arr = [[]];

const collectionStub3 = {
  subscribe: jasmine.createSpy('subscribe').and.returnValue(arr)
};
const collectionStub2 = {
  pipe: jasmine.createSpy('pipe').and.returnValue(collectionStub3)
};
const collectionStub = {
  snapshotChanges: jasmine.createSpy('snapshotChanges').and.returnValue(collectionStub2)
};
const angularFirestoreStub4 = {
  collection: jasmine.createSpy('collection').and.returnValue(collectionStub)
};

describe('EditCenterPage', () => {
  let component: EditCenterPage;
  let fixture: ComponentFixture<EditCenterPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditCenterPage ],
      imports: [IonicModule.forRoot(), ReactiveFormsModule, SharedPageModule, RouterTestingModule],
      providers: [
        FormBuilder,
        PlacesService,
        { provide: AngularFirestore, useValue: angularFirestoreStub4 },
        { provide: AuthService, useValue: mockAuthentication }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(EditCenterPage);
    component = fixture.componentInstance;
    fixture.detectChanges();

  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
