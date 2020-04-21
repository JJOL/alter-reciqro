import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { MetricsPage } from './metrics.page';
import { PlacesMetricsComponent } from './places-metrics/places-metrics.component';
import { IndicatorGraphComponent } from './indicator-graph/indicator-graph.component';

describe('MetricsPage', () => {
  let component: MetricsPage;
  let fixture: ComponentFixture<MetricsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MetricsPage, PlacesMetricsComponent, IndicatorGraphComponent],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(MetricsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
