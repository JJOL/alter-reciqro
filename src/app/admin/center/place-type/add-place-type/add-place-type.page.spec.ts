import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { FormsModule} from '@angular/forms';
import { AddPlaceTypePage } from './add-place-type.page';
import { RouterModule } from '@angular/router'
import { MockAngularFirestore } from 'src/app/core/services/mocks/firestore.mock';
import { AngularFirestore } from '@angular/fire/firestore';

describe('AddPlaceTypePage', () => {
  let component: AddPlaceTypePage;
  let fixture: ComponentFixture<AddPlaceTypePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddPlaceTypePage ],
      imports: [IonicModule.forRoot(), FormsModule, RouterModule.forRoot([])],
      providers: [
        { provide: AngularFirestore, useValue: MockAngularFirestore }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(AddPlaceTypePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
