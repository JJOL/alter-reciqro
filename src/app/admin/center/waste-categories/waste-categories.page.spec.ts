import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { WasteCategoriesPage } from './waste-categories.page';

import { RouterTestingModule } from '@angular/router/testing';
import { AngularFirestore } from '@angular/fire/firestore';
import { from } from 'rxjs';
import {MockAngularFirestore} from 'src/app/core/services/mocks/firestore.mocks';



describe('WasteCategoriesPage', () => {
  let component: WasteCategoriesPage;
  let fixture: ComponentFixture<WasteCategoriesPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WasteCategoriesPage ],
      imports: [IonicModule.forRoot(), RouterTestingModule],
      providers: [
        { provide: AngularFirestore, useValue: MockAngularFirestore }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(WasteCategoriesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
