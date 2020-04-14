import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ListCenterPage } from './list-center.page';
import { RouterTestingModule } from '@angular/router/testing';
import { AngularFirestore } from '@angular/fire/firestore';
import { from } from 'rxjs';
import {MockAngularFirestore} from 'src/app/core/services/mock/firestoremock.model';



describe('ListCenterPage', () => {
  let component: ListCenterPage;
  let fixture: ComponentFixture<ListCenterPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListCenterPage ],
      imports: [IonicModule.forRoot(), RouterTestingModule],
      providers: [
        { provide: AngularFirestore, useValue: MockAngularFirestore }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ListCenterPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {    
    expect(component).toBeTruthy();
  });
});
