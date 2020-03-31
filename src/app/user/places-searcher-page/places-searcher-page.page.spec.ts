import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PlacesSearcherPagePage } from './places-searcher-page.page';

import { SharedPageModule } from '../../shared/shared.module';
import { LugaresService } from '../../core/services/lugares.service';

const mockPlacesService = {
  getAllPlaces: () => {
    return [];
  },
  searchMapPlaces: () => {
    return [];
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
        {provide: LugaresService, useValue: mockPlacesService}
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
