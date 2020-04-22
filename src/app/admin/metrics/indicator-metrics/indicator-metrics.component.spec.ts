import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { IndicatorMetricsComponent } from './indicator-metrics.component';
import { IndicatorGraphComponent } from '../indicator-graph/indicator-graph.component';
import { FormsModule } from '@angular/forms';

describe('IndicatorMetricsComponent', () => {
  let component: IndicatorMetricsComponent;
  let fixture: ComponentFixture<IndicatorMetricsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IndicatorMetricsComponent, IndicatorGraphComponent ],
      imports: [IonicModule.forRoot(), FormsModule]
    }).compileComponents();

    fixture = TestBed.createComponent(IndicatorMetricsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  
});
