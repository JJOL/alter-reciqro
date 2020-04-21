import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PlacesMetricsComponent } from './places-metrics.component';
import { IndicatorGraphComponent } from '../indicator-graph/indicator-graph.component';

describe('PlacesMetricsComponent', () => {
  let component: PlacesMetricsComponent;
  let fixture: ComponentFixture<PlacesMetricsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlacesMetricsComponent, IndicatorGraphComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PlacesMetricsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
