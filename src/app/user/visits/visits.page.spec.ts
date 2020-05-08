import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { VisitsPage } from './visits.page';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { VisitsService } from './visits.service';
import { empty, BehaviorSubject } from 'rxjs';
import { SharedPageModule } from '../../shared/shared.module';
import { AuthService } from 'src/app/core/services/auth.service';
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


describe('VisitsPage', () => {
  let component: VisitsPage;
  let fixture: ComponentFixture<VisitsPage>;

  let visitsMock: jasmine.SpyObj<VisitsService>;

  beforeEach(async(() => {
    visitsMock = jasmine.createSpyObj('VisitsService', ['getAllVisitsForUser'])
    TestBed.configureTestingModule({
      declarations: [ VisitsPage ],
      imports: [IonicModule.forRoot(), RouterTestingModule, SharedPageModule],
      providers: [
        {provide: VisitsService, useValue: visitsMock},
        { provide: AuthService, useValue: mockAuthentication}
      ],
      // imports: [IonicModule.forRoot()],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(VisitsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
