import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { ReactiveFormsModule, FormBuilder } from '@angular/forms';

import { AddCenterPage } from './add-center.page';

describe('AddCenterPage', () => {
  let component: AddCenterPage;
  let fixture: ComponentFixture<AddCenterPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddCenterPage ],
      imports: [IonicModule.forRoot(), ReactiveFormsModule],
      providers: [
        FormBuilder
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(AddCenterPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
