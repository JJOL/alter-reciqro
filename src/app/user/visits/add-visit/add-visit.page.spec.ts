import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AddVisitPage } from './add-visit.page';
import { QrscannerComponent } from 'src/app/shared/qrscanner/qrscanner.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { VisitsService } from '../visits.service';
import { RouterTestingModule } from '@angular/router/testing';

describe('AddVisitPage', () => {
  let component: AddVisitPage;
  let fixture: ComponentFixture<AddVisitPage>;

  let visitsMock: jasmine.SpyObj<VisitsService>;

  beforeEach(async(() => {
    visitsMock = jasmine.createSpyObj('VisitsService', ['registerQRVisit']);
    TestBed.configureTestingModule({
      declarations: [ AddVisitPage ],
      imports: [RouterTestingModule],
      providers: [
        {provide: VisitsService, useValue: visitsMock}
      ],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(AddVisitPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('#onReadCode() should call registerQRVisit() if it canReadVisit', () => {
    visitsMock.registerQRVisit.and.returnValue(Promise.reject());
    component.canReadVisit = true;
    component.onReadCode({ url: 'a' });
    expect(visitsMock.registerQRVisit.calls.count()).toBe(1);
    expect(visitsMock.registerQRVisit.calls.mostRecent().args[0]).toEqual('a');
  });
  it('#onReadCode() should call deactivate canReadVisit if ', () => {
    visitsMock.registerQRVisit.and.returnValue(Promise.reject());
    component.canReadVisit = true;
    component.onReadCode({ url: '' });
    expect(component.canReadVisit).toBe(false);
  });
  it('#onReadCode() should not call registerQRVisit() if not canReadVisit ', () => {
    visitsMock.registerQRVisit.and.returnValue(Promise.reject());
    component.canReadVisit = false;
    component.onReadCode({ url: '' });
    expect(visitsMock.registerQRVisit.calls.count()).toBe(0);
  });
});
