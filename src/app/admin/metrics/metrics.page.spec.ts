import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { MetricsPage } from './metrics.page';
import { IndicatorMetricsComponent } from './indicator-metrics/indicator-metrics.component';
import { IndicatorGraphComponent } from './indicator-graph/indicator-graph.component';
import { MetricsPageService } from './services/metrics-page.service';
import { FormsModule } from '@angular/forms';

describe('MetricsPage', () => {
  let component: MetricsPage;
  let fixture: ComponentFixture<MetricsPage>;

  beforeEach(async(() => {
    let metricsServiceMock = jasmine.createSpyObj('MetricsPageService', ['getPlacesMetricsProvider', 'getDelegationsMetricsProvider', 'getSystemMetricsProvider']);
    TestBed.configureTestingModule({
      declarations: [ MetricsPage, IndicatorMetricsComponent, IndicatorGraphComponent],
      imports: [IonicModule.forRoot(), FormsModule],
      providers: [
        {provide: MetricsPageService, useValue: metricsServiceMock}
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(MetricsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('#ngInit() should call get metrics providers', () => {
    let pageService: jasmine.SpyObj<MetricsPageService> = TestBed.get(MetricsPageService);
    expect(pageService.getPlacesMetricsProvider.calls.count()).toBe(1);
    expect(pageService.getDelegationsMetricsProvider.calls.count()).toBe(1);
  });
});
