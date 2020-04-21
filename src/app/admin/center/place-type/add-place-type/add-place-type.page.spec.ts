import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AddPlaceTypePage } from './add-place-type.page';

describe('AddPlaceTypePage', () => {
  let component: AddPlaceTypePage;
  let fixture: ComponentFixture<AddPlaceTypePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddPlaceTypePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AddPlaceTypePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
