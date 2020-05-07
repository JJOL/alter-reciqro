import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { BannerPopUpPage } from './banner-pop-up.page';

describe('BannerPopUpPage', () => {
  let component: BannerPopUpPage;
  let fixture: ComponentFixture<BannerPopUpPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BannerPopUpPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(BannerPopUpPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
