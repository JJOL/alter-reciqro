import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { IndicatorGraphComponent } from './indicator-graph.component';

describe('AppIndicatorGraphComponent', () => {
  let component: IndicatorGraphComponent;
  let fixture: ComponentFixture<IndicatorGraphComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IndicatorGraphComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(IndicatorGraphComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it ('#getMonthLabels() should create an array of n months names starting from date 0', () => {
    let startDate = new Date();
    startDate.setMonth(4); // Start in Mayo
    let monthNames = component.getMonthLabels(startDate, 4); // 4 meses contando mayo. Termina en agosto
    expect(monthNames).toEqual(['Mayo','Junio','Julio','Agosto']);
  });
  
  it ('#getMonthLabels() should create an array with duplicate months if it goes over december', () => {
    let startDate = new Date();
    startDate.setMonth(4); // Start in Noviembre
    let monthNames = component.getMonthLabels(startDate, 14); // 14 meses contando Mayo. Termina en agosto
    expect(monthNames[0]).toEqual('Mayo');
    expect(monthNames[6]).toEqual('Noviembre');
    expect(monthNames[11]).toEqual('Abril');
    expect(monthNames[13]).toEqual('Junio');
  });

});
