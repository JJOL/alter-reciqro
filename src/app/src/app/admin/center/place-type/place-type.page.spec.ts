import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PlaceTypePage } from './place-type.page';

describe('PlaceTypePage', () => {
  let component: PlaceTypePage;
  let fixture: ComponentFixture<PlaceTypePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlaceTypePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PlaceTypePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
