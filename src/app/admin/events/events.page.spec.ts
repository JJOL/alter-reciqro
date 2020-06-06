import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { MockAngularFirestore } from '../../core/services/mocks/firestore.mock';
import { EventsPage } from './events.page';
import { AngularFirestore } from '@angular/fire/firestore';
import { RouterModule } from '@angular/router';
import { EventsService } from 'src/app/core/services/events.service';
import { SharedPageModule } from 'src/app/shared/shared.module';
import { AuthService } from '../../core/services/auth.service';
import { empty,BehaviorSubject } from 'rxjs';
import { NgxPaginationModule } from 'ngx-pagination';

let mockFirestore = new MockAngularFirestore();

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

const mockService = jasmine.createSpyObj('eventService',
    {
      getAllEvents: new Promise<any>((res) => {
        res([]);
      }),
      getPastEvents: new Promise<any>((res) => {
        res([]);
      }),
    }
);




describe('EventsPage', () => {
  let component: EventsPage;
  let fixture: ComponentFixture<EventsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [EventsPage],
      imports: [IonicModule.forRoot(), RouterModule.forRoot([]),SharedPageModule, NgxPaginationModule],
      providers: [
        {provide: AngularFirestore, useValue: mockFirestore},
        {provide: EventsService, useValue: mockService},
        { provide: AuthService, useValue: mockAuthentication },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(EventsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

});
