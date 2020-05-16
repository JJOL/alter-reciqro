import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import {MockAngularFirestore} from 'src/app/core/services/mocks/firestore.mock';
import { AdminPage } from './admin.page';
import { AngularFirestore } from '@angular/fire/firestore';
import { AdminService } from '../core/services/admin.service';
import { RouterModule } from '@angular/router';
import { SharedPageModule } from '../shared/shared.module';
import { BehaviorSubject , empty} from 'rxjs';
import { AuthService } from '../core/services/auth.service';
import { NgxPaginationModule } from 'ngx-pagination';

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

const mockService = jasmine.createSpyObj('adminService', ['getAllAdministrators']);

mockService.getAllAdministrators.and.returnValue(
    new Promise<any>((res) => {
      res([]);
    }));

describe('AdminPage', () => {
  let component: AdminPage;
  let fixture: ComponentFixture<AdminPage>; //refere nce to the component 

  beforeEach(async(() => {
    const firestoreMockSpy = jasmine.createSpyObj('AngularFirestore', ['collection']);
    TestBed.configureTestingModule({
      declarations: [ AdminPage ],
      imports: [IonicModule.forRoot(), RouterModule.forRoot([]),SharedPageModule, NgxPaginationModule],
      providers: [
        { provide: AngularFirestore, useValue: firestoreMockSpy },
        { provide: AdminService, useValue: mockService },
        { provide: AuthService, useValue: mockAuthentication }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(AdminPage);
    component = fixture.componentInstance;
    fixture.detectChanges();

  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should retrieve all users', () => {
    const adminServiceTest = TestBed.get(AdminService);
    component.ngOnInit();
    expect(adminServiceTest.getAllAdministrators.calls.count()).toBeGreaterThanOrEqual(1);
  });

});
