import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { FormsModule} from '@angular/forms';
import { AddPlaceTypePage } from './add-place-type.page';
import {RouterModule} from '@angular/router'

describe('AddPlaceTypePage', () => {
  let component: AddPlaceTypePage;
  let fixture: ComponentFixture<AddPlaceTypePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddPlaceTypePage ],
      imports: [IonicModule.forRoot(), FormsModule, RouterModule.forRoot([])]
    }).compileComponents();

    fixture = TestBed.createComponent(AddPlaceTypePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
