import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { InfoPage } from './info.page';
import { SharedPageModule } from 'src/app/shared/shared.module';
import { RouterModule } from '@angular/router';
import { MockAngularFirestore } from 'src/app/core/services/mocks/firestore.mock';
import { AngularFirestore } from '@angular/fire/firestore';

describe('InfoPage', () => {
  let component: InfoPage;
  let fixture: ComponentFixture<InfoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InfoPage ],
      imports: [IonicModule.forRoot(), RouterModule.forRoot([]), SharedPageModule],
      providers: [
        { provide: AngularFirestore, useValue: MockAngularFirestore }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(InfoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
