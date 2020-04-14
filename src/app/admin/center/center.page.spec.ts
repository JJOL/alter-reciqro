import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { RouterTestingModule } from '@angular/router/testing'
import { CenterPage } from './center.page';
import { AngularFirestore } from '@angular/fire/firestore';
import {MockAngularFirestore} from 'src/app/core/services/mock/firestoremock.model';


describe('CenterPage', () => {
  let component: CenterPage;
  let fixture: ComponentFixture<CenterPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CenterPage ],
      imports: [IonicModule.forRoot(), RouterTestingModule],
      providers: [
        { provide: AngularFirestore, useValue: MockAngularFirestore }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(CenterPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
