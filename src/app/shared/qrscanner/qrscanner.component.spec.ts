import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { QrscannerComponent } from './qrscanner.component';

describe('QrscannerComponent', () => {
  let component: QrscannerComponent;
  let fixture: ComponentFixture<QrscannerComponent>;

  beforeEach(async(() => {
    // TestBed.configureTestingModule({
    //   declarations: [ QrscannerComponent ],
    //   imports: [IonicModule.forRoot()]
    // }).compileComponents();

    // fixture = TestBed.createComponent(QrscannerComponent);
    // component = fixture.componentInstance;
    // fixture.detectChanges();
  }));

  it('should create', () => {
    component = new QrscannerComponent();
    expect(component).toBeTruthy();
  });
});
