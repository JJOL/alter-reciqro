import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AvisoPrivacidadPage } from './aviso-privacidad.page';

describe('AvisoPrivacidadPage', () => {
  let component: AvisoPrivacidadPage;
  let fixture: ComponentFixture<AvisoPrivacidadPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AvisoPrivacidadPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AvisoPrivacidadPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
