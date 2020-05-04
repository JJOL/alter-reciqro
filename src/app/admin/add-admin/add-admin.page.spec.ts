import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { AddAdminPage } from './add-admin.page';
import { AngularFirestore } from '@angular/fire/firestore';
import { AdminService } from '../../core/services/admin.service';

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

const mockAdminService = {

  getAllAdministrators: () => {
    return new Promise((resolve, reject) => {
      resolve([]);
    });
  },
  removeAdministratorUser:  () => {
    return [];
  },

  addAdministratorUser: () => {
    return [];
  },
};

describe('AddAdminPage', () => {
  let component: AddAdminPage;
  let fixture: ComponentFixture<AddAdminPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddAdminPage ],
      imports: [IonicModule.forRoot()],
      providers: [
        { provide: AdminService, useValue: mockAdminService },
        {provide: AngularFirestore, useValue: angularFirestoreStub},
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(AddAdminPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
