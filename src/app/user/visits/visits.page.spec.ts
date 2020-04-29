import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { VisitsPage } from './visits.page';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('VisitsPage', () => {
  let component: VisitsPage;
  let fixture: ComponentFixture<VisitsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VisitsPage ],
      // imports: [IonicModule.forRoot()],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(VisitsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
