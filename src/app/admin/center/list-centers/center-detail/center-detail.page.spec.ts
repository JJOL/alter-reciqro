import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CenterDetailPage } from './center-detail.page';

describe('CenterDetailPage', () => {
  let component: CenterDetailPage;
  let fixture: ComponentFixture<CenterDetailPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CenterDetailPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CenterDetailPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
