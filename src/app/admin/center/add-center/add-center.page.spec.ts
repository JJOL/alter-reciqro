import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import {APP_BASE_HREF} from '@angular/common';
import { AddCenterPage } from './add-center.page';
import { ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { SharedPageModule } from 'src/app/shared/shared.module';
import { AngularFirestore } from '@angular/fire/firestore';
import { PlacesService } from 'src/app/core/services/places.service';
import { RouterModule } from '@angular/router';
import {MockAngularFirestore} from 'src/app/core/services/mocks/firestore.mock';


const mockService = jasmine.createSpyObj('placeService', ['createPlace', 'allPlaceTypes']);

mockService.allPlaceTypes.and.returnValue(
  new Promise<any>((res, rej) => {
  res([]);
}));

mockService.createPlace.and.returnValue(
  new Promise<any>((res, rej) => {
  res([]);
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
        { provide: PlacesService, useValue: mockService },
        { provide: AngularFirestore, useValue: MockAngularFirestore },
        { provide: APP_BASE_HREF, useValue: '/'}
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
    const lugaresService = TestBed.get(PlacesService); /*Servicio simulado*/
    component.submit();
    expect(lugaresService.createPlace.calls.count()).toBeGreaterThanOrEqual(1);
  });

});
