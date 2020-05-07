import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { DetailEventPage } from './detail-event.page';
import { RouterTestingModule } from '@angular/router/testing';
import { AngularFirestore } from '@angular/fire/firestore';
import { from } from 'rxjs';

const arr = [[]];

const data = from(arr);

const collectionStub = {
  valueChanges: jasmine.createSpy('valueChanges').and.returnValue(data)
};

const angularFirestoreStub = {
  collection: jasmine.createSpy('collection').and.returnValue(collectionStub)
};

describe('DetailEventPage', () => {
  let component: DetailEventPage;
  let fixture: ComponentFixture<DetailEventPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailEventPage ],
      imports: [IonicModule.forRoot(), RouterTestingModule],
      providers: [
        { provide: AngularFirestore, useValue: angularFirestoreStub }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(DetailEventPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
