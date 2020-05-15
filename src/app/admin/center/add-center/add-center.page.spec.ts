import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import {APP_BASE_HREF} from '@angular/common';
import { AddCenterPage } from './add-center.page';
import { ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { SharedPageModule } from 'src/app/shared/shared.module';
import { AngularFirestore } from '@angular/fire/firestore';
import { PlacesService } from 'src/app/core/services/places.service';
import { RouterModule } from '@angular/router';
import { MockAngularFirestore } from 'src/app/core/services/mocks/firestore.mock';
import { BehaviorSubject, empty } from 'rxjs';
import { AuthService } from '../../../core/services/auth.service';

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


const mockService = jasmine.createSpyObj('placeService', ['createPlace', 'allPlaceTypes']);

mockService.allPlaceTypes.and.returnValue(
    new Promise<any>((res) => {
      res([]);
    }));

mockService.createPlace.and.returnValue(
    new Promise<any>((res) => {
      res([]);
    }));

describe('AddCenterPage', () => {
  let component: AddCenterPage;
  let fixture: ComponentFixture<AddCenterPage>;


  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddCenterPage ],
      imports: [IonicModule.forRoot(), ReactiveFormsModule, SharedPageModule, RouterModule.forRoot([])],
      providers: [
        FormBuilder,
        { provide: PlacesService, useValue: mockService },
        { provide: AngularFirestore, useValue: MockAngularFirestore },
        { provide: APP_BASE_HREF, useValue: '/'},
        { provide: AuthService, useValue: mockAuthentication }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(AddCenterPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call create service', () => {
    const lugaresService = TestBed.get(PlacesService); /*Servicio simulado*/
    component.submit();
    expect(lugaresService.createPlace.calls.count()).toBeGreaterThanOrEqual(1);
  });

});
