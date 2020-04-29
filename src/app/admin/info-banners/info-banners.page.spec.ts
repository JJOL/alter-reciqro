import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { InfoBannersPage } from './info-banners.page';
import { RouterTestingModule } from '@angular/router/testing';
import { AngularFirestore } from '@angular/fire/firestore';

import { MockAngularFirestore } from '../../core/services/mocks/firestore.mock';

describe('InfoBannersPage', () => {
  let component: InfoBannersPage;
  let fixture: ComponentFixture<InfoBannersPage>;

  beforeEach(async(() => {
    let mockFirestore = new MockAngularFirestore();
    TestBed.configureTestingModule({
      declarations: [ InfoBannersPage ],
      imports: [IonicModule.forRoot(), RouterTestingModule],
      providers: [
        { provide: AngularFirestore, useValue: mockFirestore}
      ]
    }).compileComponents();
    
    mockFirestore.setTestData([]);

    fixture = TestBed.createComponent(InfoBannersPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    
    expect(component).toBeTruthy();
  });
});
