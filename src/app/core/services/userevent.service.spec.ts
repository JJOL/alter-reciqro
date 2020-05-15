import { RouterTestingModule } from '@angular/router/testing';
import { BehaviorSubject, empty } from 'rxjs';
import { MockAngularFirestore } from 'src/app/core/services/mocks/firestore.mock';
import { AngularFirestore } from '@angular/fire/firestore';
import { AuthService } from 'src/app/core/services/auth.service';
import { TestBed } from '@angular/core/testing';

import { UserEventService } from './userevent.service';

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

describe('UserEventService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports:[RouterTestingModule],
    providers: [
      { provide: AuthService, useValue: mockAuthentication },
      { provide: AngularFirestore, useValue: MockAngularFirestore }]
  }));

  it('should be created', () => {
    const service: UserEventService = TestBed.get(UserEventService);
    expect(service).toBeTruthy();
  });
});
