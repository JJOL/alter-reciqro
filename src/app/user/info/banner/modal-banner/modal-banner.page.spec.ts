import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ModalBannerPage } from './modal-banner.page';

describe('ModalBannerPage', () => {
  let component: ModalBannerPage;
  let fixture: ComponentFixture<ModalBannerPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalBannerPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ModalBannerPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
