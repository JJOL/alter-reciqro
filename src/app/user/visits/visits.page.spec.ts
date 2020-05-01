import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { VisitsPage } from './visits.page';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { VisitsService } from './visits.service';

describe('VisitsPage', () => {
  let component: VisitsPage;
  let fixture: ComponentFixture<VisitsPage>;

  let visitsMock: jasmine.SpyObj<VisitsService>;

  beforeEach(async(() => {
    visitsMock = jasmine.createSpyObj('VisitsService', ['getAllVisitsForUser'])
    TestBed.configureTestingModule({
      declarations: [ VisitsPage ],
      providers: [
        {provide: VisitsService, useValue: visitsMock}
      ],
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
