import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CreateStaffPage } from './create-staff.page';
import { RouterTestingModule } from '@angular/router/testing';
import { ReactiveFormsModule, FormBuilder, FormGroup } from '@angular/forms';
import { AuthService } from 'src/app/core/services/auth.service';

import { AngularFirestore } from '@angular/fire/firestore';
import { SharedPageModule } from 'src/app/shared/shared.module'
import { empty } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/auth';



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

describe('CreateStaffPage', () => {
  let component: CreateStaffPage;
  let fixture: ComponentFixture<CreateStaffPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateStaffPage ],
      imports: [IonicModule.forRoot(), SharedPageModule, RouterTestingModule,ReactiveFormsModule],
      providers: [
        FormBuilder,
        
        { provide: AngularFireAuth, useValue: authStub },
        { provide: AuthService, useValue: mockAuthentication },
        { provide: AngularFirestore, useValue: angularFirestoreStub4 }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(CreateStaffPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
