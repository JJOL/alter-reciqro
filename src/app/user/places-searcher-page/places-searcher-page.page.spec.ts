import { empty } from 'rxjs';
import { AngularFireAuth } from 'angularfire2/auth';
import { AuthService } from './../../core/services/auth.service';
import { MarkerCardComponent } from './../marker-card/marker-card.component';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { PlacesSearcherPagePage } from './places-searcher-page.page';
import { FilterMenuComponent } from '../../shared/ui/filter-menu/filter-menu.component';
import { SharedPageModule } from '../../shared/shared.module';
import { PlacesService } from '../../core/services/places.service';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import {MockAngularFirestore} from 'src/app/core/services/mocks/firestore.mock';
import { RouterTestingModule } from '@angular/router/testing';


const mockPlacesService = {
  getAllPlaces: () => {
    return [];
  },
  searchMapPlaces: () => {
    return [];
  },
  getIDPlacesTypesByWaste : () => {
    return new Promise((resolve, reject) => {
      resolve([]);
    });
  },
  getIDPlacesByPlacesType: () => {
    return new Promise((resolve, reject) => {
      resolve([]);
    });
  },
  getAllWasteTypes: () => {
    return new Promise((resolve, reject) => {
      resolve([]);
    });
  },
};

const mockGeolocation = {
  getCurrentPosition: () => {
    return new Promise((res, rej) => {
      res({
        coords: {
          latitude: 4,
          longitude: 3
        }
      });
    });
  }
};

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
};

const authStub: any = {
  authState: {},
  auth: {
    signInWithEmailAndPassword() {
      return Promise.resolve();
    }
  }
};


describe('PlacesSearcherPagePage', () => {
  let component: PlacesSearcherPagePage;
  let fixture: ComponentFixture<PlacesSearcherPagePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlacesSearcherPagePage, MarkerCardComponent ],
      imports: [IonicModule.forRoot(), SharedPageModule, RouterTestingModule],
      providers: [
        { provide: PlacesService, useValue: mockPlacesService },
        { provide: Geolocation, useValue: mockGeolocation },
        { provide: AuthService, useValue: mockAuthentication },
        { provide: AngularFirestore, useValue: MockAngularFirestore },
        { provide: AngularFireAuth, useValue: authStub }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(PlacesSearcherPagePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should not center Qro because map doesnt exist', () => {
    const center = component.viewQro();
    expect(center).toBeTruthy();
  });
});
