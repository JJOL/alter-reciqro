import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { AddWasteTypePage } from './add-waste-type.page';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore';
import { MockAngularFirestore } from 'src/app/core/services/mocks/firestore.mock';
import { WasteService } from 'src/app/core/services/waste.service';

const mockWasteService = jasmine.createSpyObj('wasteService', ['addWasteType']);

mockWasteService.addWasteType.and.returnValue(
  new Promise<any>((res) => {
    res([]);
}));


describe('AddWasteTypePage', () => {
  let component: AddWasteTypePage;
  let fixture: ComponentFixture<AddWasteTypePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddWasteTypePage],
      imports: [IonicModule.forRoot(), FormsModule, RouterModule.forRoot([]), ReactiveFormsModule],
      providers: [
        FormBuilder,
        { provide: WasteService, useValue: mockWasteService },
        { provide: AngularFirestore, useValue: MockAngularFirestore }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(AddWasteTypePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
