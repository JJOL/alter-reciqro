import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { EventsService } from 'src/app/core/services/events.service';
import { AngularFirestore } from '@angular/fire/firestore';

import { DetailPage } from './detail.page';
import { SharedPageModule } from 'src/app/shared/shared.module';
import { empty,BehaviorSubject } from 'rxjs';
import { AuthService } from '../../../core/services/auth.service';
import { RouterModule } from '@angular/router';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
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
const arr = function() {};
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

const mockService = jasmine.createSpyObj('eventService', ['getAllEvents']);

mockService.getAllEvents.and.returnValue(
    new Promise<any>((res) => {
      res([]);
    }));
describe('DetailPage', () => {
  let component: DetailPage;
  let fixture: ComponentFixture<DetailPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailPage ],
      imports: [IonicModule.forRoot(),RouterModule.forRoot([]),SharedPageModule,RouterTestingModule,ReactiveFormsModule],
      providers:[
        FormBuilder,
        {provide: AngularFirestore, useValue: angularFirestoreStub},
        {provide: EventsService, useValue: mockService},
        { provide: AuthService, useValue: mockAuthentication }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(DetailPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
