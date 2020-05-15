import { SharedPageModule } from 'src/app/shared/shared.module';
import { AuthService } from 'src/app/core/services/auth.service';
import { BehaviorSubject, empty } from 'rxjs';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { EventsPage } from './events.page';
import { RouterModule } from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore';
import { EventsService } from 'src/app/core/services/events.service';



const arr = function() {};

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

describe('EventsPage', () => {
  let component: EventsPage;
  let fixture: ComponentFixture<EventsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [EventsPage],
      imports: [IonicModule.forRoot(), RouterModule.forRoot([]),SharedPageModule],
      providers: [
        {provide: AngularFirestore, useValue: angularFirestoreStub},
        {provide: EventsService, useValue: mockService},
        { provide: AuthService, useValue: mockAuthentication }
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(EventsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call get events from service', () => {
    const eventService = TestBed.get(EventsService);
    component.ngOnInit();
    expect(eventService.getAllEvents.calls.count()).toBeGreaterThanOrEqual(1);
  });
});
