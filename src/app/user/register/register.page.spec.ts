import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { RouterTestingModule } from '@angular/router/testing';
import { RegisterPage } from './register.page';
import { ReactiveFormsModule, FormBuilder, FormGroup } from '@angular/forms';
import { AuthService } from 'src/app/core/services/auth.service';

import { AngularFirestore } from '@angular/fire/firestore';
import { SharedPageModule } from 'src/app/shared/shared.module'
import { empty, from } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/auth';
import { NO_ERRORS_SCHEMA } from '@angular/core';


const arr = [[]];

const data = from(arr);
const collectionStub3 = {
  subscribe: jasmine.createSpy('subscribe').and.returnValue(arr)
};
const collectionStub2 = {
  pipe: jasmine.createSpy('pipe').and.returnValue(collectionStub3)
};
const collectionStub5 = {
  valueChanges: jasmine.createSpy('valueChanges').and.returnValue(data)
};
const collectionStub = {
  snapshotChanges: jasmine.createSpy('snapshotChanges').and.returnValue(collectionStub2)
};
const angularFirestoreStub4 = {
  collection: jasmine.createSpy('collection').and.returnValue(collectionStub)
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
};

const authStub: any = {
  authState: {},
  auth: {
    signInWithEmailAndPassword() {
      return Promise.resolve();
    }
  }
};

describe('RegisterPage', () => {
  let component: RegisterPage;
  let fixture: ComponentFixture<RegisterPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegisterPage ],
      imports: [IonicModule.forRoot(), SharedPageModule, RouterTestingModule,ReactiveFormsModule],
      providers: [
        FormBuilder,
        
        { provide: AngularFireAuth, useValue: authStub },
        { provide: AuthService, useValue: mockAuthentication },
        { provide: AngularFirestore, useValue: angularFirestoreStub4 }
      ],
      schemas: [ NO_ERRORS_SCHEMA ]
    }).compileComponents();

    fixture = TestBed.createComponent(RegisterPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
