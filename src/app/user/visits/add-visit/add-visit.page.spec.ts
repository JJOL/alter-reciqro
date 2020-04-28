import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AddVisitPage } from './add-visit.page';
import { QrscannerComponent } from 'src/app/shared/qrscanner/qrscanner.component';

describe('AddVisitPage', () => {
  let component: AddVisitPage;
  let fixture: ComponentFixture<AddVisitPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddVisitPage, QrscannerComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AddVisitPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
