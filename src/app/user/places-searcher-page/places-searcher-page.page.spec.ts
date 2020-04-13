import { MarkerCardComponent } from './../marker-card/marker-card.component';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { PlacesSearcherPagePage } from './places-searcher-page.page';

import { SharedPageModule } from '../../shared/shared.module';
import { PlacesService } from '../../core/services/places.service';
import { Geolocation } from '@ionic-native/geolocation/ngx';



const mockPlacesService = {
  getAllPlaces: () => {
    return [];
  },
  searchMapPlaces: () => {
    return [];
  },
  getIDPlacesByWaste: () => {
  return new Promise((resolve,reject) => {
    resolve([]);
    });
  },

}

const mockGeolocation = {
  getCurrentPosition: () => {
    return new Promise((res, rej) => {
      res({
        coords: {
          latitude: 4,
          longitude: 3
        }
      });
    })
  }
}

describe('PlacesSearcherPagePage', () => {
  let component: PlacesSearcherPagePage;
  let fixture: ComponentFixture<PlacesSearcherPagePage>;
  let mockFirestoreSpy: jasmine.SpyObj<AngularFirestore>; 

  beforeEach(async(() => {
    const firestoreMockSpy = jasmine.createSpyObj('AngularFirestore', ['collection']);
    TestBed.configureTestingModule({
      declarations: [ PlacesSearcherPagePage, MarkerCardComponent ],
      imports: [IonicModule.forRoot(), SharedPageModule],
      providers: [
        { provide: PlacesService, useValue: mockPlacesService },
        { provide: Geolocation, useValue: mockGeolocation },
        { provide: AngularFirestore, useValue: firestoreMockSpy },
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(PlacesSearcherPagePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
