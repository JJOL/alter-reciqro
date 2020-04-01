import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { AddCenterPage } from './add-center.page';
import { ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { SharedPageModule } from 'src/app/shared/shared.module';
import { from } from 'rxjs';
import { AngularFirestore } from '@angular/fire/firestore';
import { LugaresService } from 'src/app/core/services/lugares.service';
import { RouterModule } from '@angular/router';

const arr = function(){};

//const data = from(arr);
const collectionStub3 = {
  subscribe: jasmine.createSpy('subscribe').and.returnValue(arr)
}

const collectionStub2 = {
  pipe: jasmine.createSpy('pipe').and.returnValue(collectionStub3)
}

const collectionStub = {
  snapshotChanges: jasmine.createSpy('snapshotChanges').and.returnValue(collectionStub2)
}


const angularFirestoreStub = {
  collection: jasmine.createSpy('collection').and.returnValue(collectionStub)
}

const mockService = jasmine.createSpyObj("placeService", ["createPlace", "allPlaceTypes"]);

mockService.allPlaceTypes.and.returnValue(
  new Promise<any>((res, rej) => {
  res([])
}));

describe('AddCenterPage', () => {
  let component: AddCenterPage;
  let fixture: ComponentFixture<AddCenterPage>;


  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddCenterPage ],
      imports: [IonicModule.forRoot(), ReactiveFormsModule, SharedPageModule, RouterModule.forRoot([])],
      providers: [
        FormBuilder,
        { provide: LugaresService, mockService },
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


  it('should call create service', () => {
    const lugaresService = TestBed.get(LugaresService);/*Servicio simulado*/
    component.submit(); 
    expect(lugaresService.createPlace.calls.count()).toBe(1);
  });
});

//Casos esperados: 1. Que lo que haga submit sea lo que espere, es decir, que los validadores que se usen sean los adecuados. 2. Que se haya ejecutado la funcion de toast.

