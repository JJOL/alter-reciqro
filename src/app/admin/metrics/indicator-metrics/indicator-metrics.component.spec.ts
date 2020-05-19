import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { IndicatorMetricsComponent } from './indicator-metrics.component';
import { IndicatorGraphComponent } from '../indicator-graph/indicator-graph.component';
import { FormsModule } from '@angular/forms';
import { IndicatorTableComponent } from '../indicator-table/indicator-table.component';
import { RouterTestingModule } from '@angular/router/testing';

describe('IndicatorMetricsComponent', () => {
  let component: IndicatorMetricsComponent;
  let fixture: ComponentFixture<IndicatorMetricsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IndicatorMetricsComponent, IndicatorGraphComponent, IndicatorTableComponent ],
      imports: [IonicModule.forRoot(), FormsModule, RouterTestingModule]
    }).compileComponents();

    fixture = TestBed.createComponent(IndicatorMetricsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  
});
