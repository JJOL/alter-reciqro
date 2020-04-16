import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { AngularFirestore } from '@angular/fire/firestore';
import { WastePage } from './waste.page';
import { RouterModule } from '@angular/router';
import { WasteService } from 'src/app/core/services/waste.service';

const arr = function(){};

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

const mockService = jasmine.createSpyObj("placeService", ["getWastes"]);

mockService.getWastes.and.returnValue(
  new Promise<any>((res, rej) => {
  res([])
}));

describe('WastePage', () => {
  let component: WastePage;
  let fixture: ComponentFixture<WastePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WastePage ],
      imports: [IonicModule.forRoot(), RouterModule.forRoot([])],
      providers: [      
        { provide: AngularFirestore, useValue: angularFirestoreStub },
        { provide: WasteService, useValue: mockService },
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(WastePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call get wastes from service', () => {
    const wasteService = TestBed.get(WasteService);
    component.ngOnInit();
    expect(wasteService.getWastes.calls.count()).toBeGreaterThanOrEqual(1);
  });

});
