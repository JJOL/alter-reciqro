import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { GoogleMapComponent } from './google-map.component';
import { PlacesService } from '../../core/services/places.service';
import {MockAngularFirestore} from 'src/app/core/services/mocks/firestore.mock';
import { SystemService } from 'src/app/core/services/system.service';

const mockPlacesService = {
  getAllPlaces: () => {
    return [];
  },
  searchMapPlaces: () => {
    return [];
  },
  getIDPlacesTypesByWaste : () => {
    return new Promise((resolve) => {
      resolve([]);
    });
  },
  getIDPlacesByPlacesType: () => {
    return new Promise((resolve) => {
      resolve([]);
    });
  },
  getAllWasteTypes: () => {
    return new Promise((resolve) => {
      resolve([]);
    });
  },
};


describe('GoogleMapComponent', () => {
  let component: GoogleMapComponent;
  let fixture: ComponentFixture<GoogleMapComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GoogleMapComponent ],
      imports: [IonicModule.forRoot()],
      providers: [
        { provide: PlacesService, useValue: mockPlacesService },
        { provide: SystemService, useValue: MockAngularFirestore },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(GoogleMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  const place = {id: 'asd', name: 'dasd', description: 'dasd', location: {lat: 100, lng: 200}, qr_code: 'das', photo: 'das', address: 'dsa', postal_code: 1, places_type: {id: '', name: 'das', icon: 'das'}};
  /*
  it('should add marker', () => {
    expect(component.addPlace(place)).toEqual(1);
  });
 NEcesitamos test async
  it('should add place', () => {
    expect(component.addMarker(place)).toEqual(1);
  });*/

});
