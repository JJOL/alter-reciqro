import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CenterPage } from './center.page';
import { RouterModule } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing'


describe('CenterPage', () => {
  let component: CenterPage;
  let fixture: ComponentFixture<CenterPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CenterPage ],
      imports: [IonicModule.forRoot(), RouterModule, RouterTestingModule],
      providers: []
    }).compileComponents();

    fixture = TestBed.createComponent(CenterPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
