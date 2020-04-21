import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import {AngularFirestore} from '@angular/fire/firestore';
import { UserPage } from './user.page';

const arr = function() {};

const collectionStub3 = {
  subscribe: jasmine.createSpy('subscribe').and.returnValue(arr),
};

const collectionStub2 = {
  pipe: jasmine.createSpy('pipe').and.returnValue(collectionStub3),
};

const collectionStub = {
  snapshotChanges: jasmine.createSpy('snapshotChanges').and.returnValue(collectionStub2),
};

const angularFirestoreStub = {
  collection: jasmine.createSpy('collection').and.returnValue(collectionStub),
};

describe('UserPage', () => {
  let component: UserPage;
  let fixture: ComponentFixture<UserPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserPage ],
      imports: [IonicModule.forRoot()],
      providers: [
        {provide: AngularFirestore, useValue: angularFirestoreStub},
      ]
    }).compileComponents();

  fixture = TestBed.createComponent(UserPage);
  component = fixture.componentInstance;
  fixture.detectChanges();

}));

it('should create', () => {
  expect(component).toBeTruthy();
  });
});
