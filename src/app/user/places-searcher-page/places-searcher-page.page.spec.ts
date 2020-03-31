import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PlacesSearcherPagePage } from './places-searcher-page.page';

import { SharedPageModule } from '../../shared/shared.module';
import { LugaresService } from '../../core/services/lugares.service';
import { Geolocation } from '@ionic-native/geolocation/ngx';



const mockPlacesService = {
  getAllPlaces: () => {
    return [];
  },
  searchMapPlaces: () => {
    return [];
  }
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

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlacesSearcherPagePage ],
      imports: [IonicModule.forRoot(), SharedPageModule],
      providers: [
        { provide: LugaresService, useValue: mockPlacesService },
        { provide: Geolocation, useValue: mockGeolocation }
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
