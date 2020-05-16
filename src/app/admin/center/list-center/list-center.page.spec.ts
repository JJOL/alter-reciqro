import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ListCenterPage } from './list-center.page';
import { RouterTestingModule } from '@angular/router/testing';
import { AngularFirestore } from '@angular/fire/firestore';
import {MockAngularFirestore} from 'src/app/core/services/mocks/firestore.mock';
import { BehaviorSubject,empty } from 'rxjs';
import { SharedPageModule } from 'src/app/shared/shared.module';
import { AuthService } from '../../../core/services/auth.service';
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


describe('ListCenterPage', () => {
  let component: ListCenterPage;
  let fixture: ComponentFixture<ListCenterPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListCenterPage ],
      imports: [IonicModule.forRoot(), RouterTestingModule, SharedPageModule, NgxPaginationModule],
      providers: [
        { provide: AngularFirestore, useValue: MockAngularFirestore },
        { provide: AuthService, useValue: mockAuthentication }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ListCenterPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
