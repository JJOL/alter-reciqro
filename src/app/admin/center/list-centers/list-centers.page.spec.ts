import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ListCentersPage } from './list-centers.page';
import { RouterTestingModule } from '@angular/router/testing';
import { AngularFirestore } from '@angular/fire/firestore';
import { from } from 'rxjs';

const arr = [[]];

const data = from(arr);

const collectionStub = {
  valueChanges: jasmine.createSpy('valueChanges').and.returnValue(data)
}

const angularFirestoreStub = {
  collection: jasmine.createSpy('collection').and.returnValue(collectionStub)
}

describe('ListCentersPage', () => {
  let component: ListCentersPage;
  let fixture: ComponentFixture<ListCentersPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListCentersPage ],
      imports: [IonicModule.forRoot(), RouterTestingModule],
      providers: [
        { provide: AngularFirestore, useValue: angularFirestoreStub }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ListCentersPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {    
    expect(component).toBeTruthy();
  });
});
