import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { EditCentersPage } from './edit-centers.page';

describe('EditCentersPage', () => {
  let component: EditCentersPage;
  let fixture: ComponentFixture<EditCentersPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditCentersPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(EditCentersPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
