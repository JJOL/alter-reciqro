import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { PlaceTypePage } from './place-type.page';
import { RouterTestingModule } from '@angular/router/testing';
import { AngularFirestore } from '@angular/fire/firestore';
import {MockAngularFirestore} from 'src/app/core/services/mocks/firestore.mock';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';



describe('PlaceTypePage', () => {
  let component: PlaceTypePage;
  let fixture: ComponentFixture<PlaceTypePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlaceTypePage ],
      imports: [IonicModule.forRoot(), RouterTestingModule, FormsModule, RouterModule.forRoot([])],
      providers: [
        { provide: AngularFirestore, useValue: MockAngularFirestore }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(PlaceTypePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
