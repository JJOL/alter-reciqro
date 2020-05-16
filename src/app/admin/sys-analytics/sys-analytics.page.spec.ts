import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SysAnalyticsPage } from './sys-analytics.page';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { SystemService } from 'src/app/core/services/system.service';

describe('SysAnalyticsPage', () => {
  let component: SysAnalyticsPage;
  let fixture: ComponentFixture<SysAnalyticsPage>;
  let sysServMock: jasmine.SpyObj<SystemService>;

  beforeEach(async(() => {
    sysServMock = jasmine.createSpyObj('SystemService', ['clearCache', 'getCalls']);
    sysServMock.getCalls.and.returnValue([]);

    TestBed.configureTestingModule({
      declarations: [ SysAnalyticsPage ],
      imports: [IonicModule.forRoot()],
      providers: [
          { provide: SystemService, useValue: sysServMock}
      ],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(SysAnalyticsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
