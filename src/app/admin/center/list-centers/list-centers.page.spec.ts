import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ListCentersPage } from './list-centers.page';

describe('ListCentersPage', () => {
  let component: ListCentersPage;
  let fixture: ComponentFixture<ListCentersPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListCentersPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ListCentersPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
