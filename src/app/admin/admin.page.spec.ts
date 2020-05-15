import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import {MockAngularFirestore} from 'src/app/core/services/mocks/firestore.mock';
import { AdminPage } from './admin.page';
import { AngularFirestore } from '@angular/fire/firestore';
import { AdminService } from '../core/services/admin.service';
import { RouterModule } from '@angular/router';

const mockService = jasmine.createSpyObj('adminService', ['getAllAdministrators']);

mockService.getAllAdministrators.and.returnValue(
    new Promise<any>((res) => {
      res([]);
    }));

describe('AdminPage', () => {
  let component: AdminPage;
  let fixture: ComponentFixture<AdminPage>; //refere nce to the component 

  beforeEach(async(() => {
    const firestoreMockSpy = jasmine.createSpyObj('AngularFirestore', ['collection']);
    TestBed.configureTestingModule({
      declarations: [ AdminPage ],
      imports: [IonicModule.forRoot(), RouterModule.forRoot([])],
      providers: [
        { provide: AngularFirestore, useValue: firestoreMockSpy },
        { provide: AdminService, useValue: mockService },
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(AdminPage);
    component = fixture.componentInstance;
    fixture.detectChanges();

  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should retrieve all users', () => {
    const adminServiceTest = TestBed.get(AdminService);
    component.ngOnInit();
    expect(adminServiceTest.getAllAdministrators.calls.count()).toBeGreaterThanOrEqual(1);
  });

});
