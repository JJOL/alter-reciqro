import { MarkerCardComponent } from './../marker-card/marker-card.component';
import { async, ComponentFixture, TestBed, fakeAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { PlacesSearcherPagePage } from './places-searcher-page.page';
import { FilterMenuComponent } from '../../shared/ui/filter-menu/filter-menu.component';
import { SharedPageModule } from '../../shared/shared.module';
import { PlacesService } from '../../core/services/places.service';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import {MockAngularFirestore} from 'src/app/core/services/mocks/firestore.mock';


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

describe('PlacesSearcherPagePage', () => {
  let component: PlacesSearcherPagePage;
  let fixture: ComponentFixture<PlacesSearcherPagePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({

      declarations: [ PlacesSearcherPagePage, MarkerCardComponent ],
      imports: [IonicModule.forRoot(), SharedPageModule],
      providers: [
        { provide: PlacesService, useValue: mockPlacesService },
        { provide: Geolocation, useValue: mockGeolocation },
        { provide: AngularFirestore, useValue: MockAngularFirestore },
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
