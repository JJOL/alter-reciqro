import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { RouterTestingModule } from '@angular/router/testing';
import { EditCenterPage } from './edit-center.page';

import { AngularFirestore } from '@angular/fire/firestore';
import { ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { PlacesService } from 'src/app/core/services/places.service';
import {MockAngularFirestore } from '../../../../core/services/mocks/firestore.mock'
import { SharedPageModule } from 'src/app/shared/shared.module';



describe('EditCenterPage', () => {
  let component: EditCenterPage;
  let fixture: ComponentFixture<EditCenterPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditCenterPage ],
      imports: [IonicModule.forRoot(), ReactiveFormsModule, SharedPageModule, RouterTestingModule],
      providers: [
        FormBuilder,
        PlacesService,
        { provide: AngularFirestore, useValue: MockAngularFirestore }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(EditCenterPage);
    component = fixture.componentInstance;
    fixture.detectChanges();

  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
