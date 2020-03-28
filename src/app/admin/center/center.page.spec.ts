import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing'

import { CenterPage } from './center.page';

describe('CenterPage', () => {
  let component: CenterPage;
  let fixture: ComponentFixture<CenterPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CenterPage ],
      imports: [IonicModule.forRoot(), RouterTestingModule]
    }).compileComponents();

    fixture = TestBed.createComponent(CenterPage);
    // component = fixture.componentInstance;
    // fixture.detectChanges();
  }));

  it('should create', () => {
    // expect(component).toBeTruthy();
  });
});
