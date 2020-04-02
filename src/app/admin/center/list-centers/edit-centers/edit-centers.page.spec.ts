import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { RouterTestingModule } from '@angular/router/testing';
import { EditCentersPage } from './edit-centers.page';

import { AngularFirestore } from '@angular/fire/firestore';
import { from } from 'rxjs';
import { ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { LugaresService } from 'src/app/core/services/lugares.service';

import { SharedPageModule } from 'src/app/shared/shared.module';

const arr = [[]];

const data = from(arr);

const collectionStub = {
  valueChanges: jasmine.createSpy('valueChanges').and.returnValue(data)
}

const angularFirestoreStub = {
  collection: jasmine.createSpy('collection').and.returnValue(collectionStub)
}

describe('EditCentersPage', () => {
  let component: EditCentersPage;
  let fixture: ComponentFixture<EditCentersPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditCentersPage ],
      imports: [IonicModule.forRoot(), ReactiveFormsModule, SharedPageModule,RouterTestingModule],
      providers: [
        FormBuilder,
        LugaresService,
        { provide: AngularFirestore, useValue: angularFirestoreStub }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(EditCentersPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
    
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
