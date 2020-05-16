import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { WasteTypePage } from './waste-type.page';
import { RouterTestingModule } from '@angular/router/testing';
import { AngularFirestore } from '@angular/fire/firestore';
import { MockAngularFirestore } from 'src/app/core/services/mocks/firestore.mock';
import { WasteService } from 'src/app/core/services/waste.service';
import { PlacesService } from 'src/app/core/services/places.service';
import { SharedPageModule } from '../../../shared/shared.module';
import { AuthService } from '../../../core/services/auth.service';
import { empty, BehaviorSubject } from 'rxjs'
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

const mockPlaceService = jasmine.createSpyObj('placesService', ['getIDPlacesTypesByWaste']);
const mockWasteService = jasmine.createSpyObj('wasteService', ['getWastes', 'deleteWasteTypeByID']);

mockPlaceService.getIDPlacesTypesByWaste.and.returnValue(
    new Promise<any>((res) => {
      res([]);
    }));

mockWasteService.getWastes.and.returnValue(
    new Promise<any>((res) => {
      res([]);
    }));

mockWasteService.deleteWasteTypeByID.and.returnValue(
    new Promise<any>((res) => {
      res([]);
    }));


describe('WasteTypePage', () => {
  let component: WasteTypePage;
  let fixture: ComponentFixture<WasteTypePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WasteTypePage ],
      imports: [IonicModule.forRoot(), RouterTestingModule, SharedPageModule, NgxPaginationModule],
      providers: [
        { provide: WasteService, useValue: mockWasteService },
        { provide: PlacesService, useValue: mockPlaceService },
        { provide: AngularFirestore, useValue: MockAngularFirestore },
        { provide: AuthService, useValue: mockAuthentication}
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(WasteTypePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
