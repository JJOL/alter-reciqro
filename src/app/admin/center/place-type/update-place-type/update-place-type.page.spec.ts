import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import {RouterModule} from '@angular/router';
import { UpdatePlaceTypePage } from './update-place-type.page';
import { FormsModule} from '@angular/forms';

describe('UpdatePlaceTypePage', () => {
  let component: UpdatePlaceTypePage;
  let fixture: ComponentFixture<UpdatePlaceTypePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdatePlaceTypePage ],
      imports: [IonicModule.forRoot(), RouterModule.forRoot([]), FormsModule]
    }).compileComponents();

    fixture = TestBed.createComponent(UpdatePlaceTypePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
