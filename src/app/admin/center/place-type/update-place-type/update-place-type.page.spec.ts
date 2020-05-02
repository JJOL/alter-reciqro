import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { UpdatePlaceTypePage } from './update-place-type.page';
import { ReactiveFormsModule, FormBuilder} from '@angular/forms';
import { AngularFirestore } from '@angular/fire/firestore';
import { MockAngularFirestore } from 'src/app/core/services/mocks/firestore.mock';
import { SharedPageModule } from '../../../../shared/shared.module';
import { AuthService } from '../../../../core/services/auth.service';
import { empty, BehaviorSubject } from 'rxjs'

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

describe('UpdatePlaceTypePage', () => {
  let component: UpdatePlaceTypePage;
  let fixture: ComponentFixture<UpdatePlaceTypePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdatePlaceTypePage ],
      imports: [IonicModule.forRoot(), RouterModule.forRoot([]), SharedPageModule, ReactiveFormsModule],
      providers: [
        FormBuilder,
        { provide: AngularFirestore, useValue: MockAngularFirestore },
        { provide: AuthService, useValue: mockAuthentication}
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(UpdatePlaceTypePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
