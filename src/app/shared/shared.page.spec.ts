import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SharedPage } from './shared.page';
import { FilterMenuComponent } from './ui/filter-menu/filter-menu.component';
import {FilterButtonComponent} from './ui/filter-button/filter-button.component';
import { AngularFirestore } from '@angular/fire/firestore';
import { environment } from '../../environments/environment';
import { from } from 'rxjs';
import {MockAngularFirestore} from 'src/app/core/services/mock/firestoremock.model';


describe('SharedPage', () => {
  let component: SharedPage;
  let fixture: ComponentFixture<SharedPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SharedPage,FilterMenuComponent,FilterButtonComponent ],
      imports: [IonicModule.forRoot()],
      providers: [ { provide: AngularFirestore, useValue: MockAngularFirestore }]
    }).compileComponents();

    fixture = TestBed.createComponent(SharedPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
