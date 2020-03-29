import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AddCenterPage } from './add-center.page';
import { ReactiveFormsModule, FormBuilder } from '@angular/forms';

describe('AddCenterPage', () => {
  let component: AddCenterPage;
  let fixture: ComponentFixture<AddCenterPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddCenterPage ],
      imports: [IonicModule.forRoot(), ReactiveFormsModule],
      providers: [FormBuilder]
    }).compileComponents();

    fixture = TestBed.createComponent(AddCenterPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
