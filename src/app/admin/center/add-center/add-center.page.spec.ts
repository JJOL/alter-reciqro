import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { AddCenterPage } from './add-center.page';
import { ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { SharedPageModule } from 'src/app/shared/shared.module';
import { from } from 'rxjs';
import { AngularFirestore } from '@angular/fire/firestore';

const arr = [[]];

const data = from(arr);

const collectionStub = {
  valueChanges: jasmine.createSpy('valueChanges').and.returnValue(data)
}

const angularFirestoreStub = {
  collection: jasmine.createSpy('collection').and.returnValue(collectionStub)
}

describe('AddCenterPage', () => {
  let component: AddCenterPage;
  let fixture: ComponentFixture<AddCenterPage>;


  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddCenterPage ],
      imports: [IonicModule.forRoot(), ReactiveFormsModule, SharedPageModule],
      providers: [
        FormBuilder,
        { provide: AngularFirestore, useValue: angularFirestoreStub }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(AddCenterPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
