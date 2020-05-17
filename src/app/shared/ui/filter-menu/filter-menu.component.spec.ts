import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { FilterMenuComponent } from './filter-menu.component';
import {FilterButtonComponent} from '../filter-button/filter-button.component';
import { AngularFirestore } from '@angular/fire/firestore';
import { from } from 'rxjs';
import { NgxPaginationModule } from 'ngx-pagination';
import { RouterModule } from '@angular/router';


const arr = [[]];

const data = from(arr);

const collectionStub = {
  valueChanges: jasmine.createSpy('valueChanges').and.returnValue(data)
};

const angularFirestoreStub = {
  collection: jasmine.createSpy('collection').and.returnValue(collectionStub)
};

describe('FilterMenuComponent', () => {
  let component: FilterMenuComponent;
  let fixture: ComponentFixture<FilterMenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FilterMenuComponent, FilterButtonComponent],
      imports: [IonicModule.forRoot(), NgxPaginationModule,  RouterModule.forRoot([])],
      providers: [   { provide: AngularFirestore, useValue: angularFirestoreStub }]
    }).compileComponents();

    fixture = TestBed.createComponent(FilterMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
