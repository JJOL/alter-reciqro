import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AddVisitPage } from './add-visit.page';
import { QrscannerComponent } from 'src/app/shared/qrscanner/qrscanner.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { VisitsService } from '../visits.service';
import { RouterTestingModule } from '@angular/router/testing';
import { SharedPageModule } from '../../../shared/shared.module';
import { AuthService } from 'src/app/core/services/auth.service';
import { empty, BehaviorSubject } from 'rxjs';

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


describe('AddVisitPage', () => {
  let component: AddVisitPage;
  let fixture: ComponentFixture<AddVisitPage>;

  let visitsMock: jasmine.SpyObj<VisitsService>;

  beforeEach(async(() => {
    visitsMock = jasmine.createSpyObj('VisitsService', ['registerQRVisit']);
    TestBed.configureTestingModule({
      declarations: [ AddVisitPage ],
      imports: [RouterTestingModule, SharedPageModule],
      providers: [
        {provide: VisitsService, useValue: visitsMock},
        { provide: AuthService, useValue: mockAuthentication}
      ],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(AddVisitPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('#onReadCode() should call registerQRVisit() if it canReadVisit', () => {
    visitsMock.registerQRVisit.and.returnValue(Promise.reject());
    component.canReadVisit = true;
    component.onReadCode({ url: 'a' });
    expect(visitsMock.registerQRVisit.calls.count()).toBe(1);
    expect(visitsMock.registerQRVisit.calls.mostRecent().args[0]).toEqual('a');
  });
  it('#onReadCode() should call deactivate canReadVisit if ', () => {
    visitsMock.registerQRVisit.and.returnValue(Promise.reject());
    component.canReadVisit = true;
    component.onReadCode({ url: '' });
    expect(component.canReadVisit).toBe(false);
  });
  it('#onReadCode() should not call registerQRVisit() if not canReadVisit ', () => {
    visitsMock.registerQRVisit.and.returnValue(Promise.reject());
    component.canReadVisit = false;
    component.onReadCode({ url: '' });
    expect(visitsMock.registerQRVisit.calls.count()).toBe(0);
  });
});
