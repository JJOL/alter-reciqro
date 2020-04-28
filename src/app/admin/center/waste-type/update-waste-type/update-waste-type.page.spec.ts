import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { UpdateWasteTypePage } from './update-waste-type.page';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore';
import { MockAngularFirestore } from 'src/app/core/services/mocks/firestore.mock';

describe('UpdateWasteTypePage', () => {
  let component: UpdateWasteTypePage;
  let fixture: ComponentFixture<UpdateWasteTypePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateWasteTypePage ],
      imports: [IonicModule.forRoot(), FormsModule, RouterModule.forRoot([])],
      providers: [
        { provide: AngularFirestore, useValue: MockAngularFirestore }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(UpdateWasteTypePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
