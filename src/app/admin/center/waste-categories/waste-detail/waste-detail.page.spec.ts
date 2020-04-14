import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { WasteDetailPage } from './waste-detail.page';
import { RouterTestingModule } from '@angular/router/testing';
import { AngularFirestore } from '@angular/fire/firestore';
import { from } from 'rxjs';
import {MockAngularFirestore} from 'src/app/core/services/mocks/firestore.mock';

const arr = [[]];



describe('WasteDetailPage', () => {
  let component: WasteDetailPage;
  let fixture: ComponentFixture<WasteDetailPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WasteDetailPage ],
      imports: [IonicModule.forRoot(), RouterTestingModule],
      providers: [
        { provide: AngularFirestore, useValue: MockAngularFirestore }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(WasteDetailPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
