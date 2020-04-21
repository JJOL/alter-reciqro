import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { RouterTestingModule } from '@angular/router/testing';
import { AngularFirestore } from '@angular/fire/firestore';
import { AuthService } from 'src/app/core/services/auth.service';
import { RecoverPasswordPage } from './recover-password.page';
import { from, empty } from 'rxjs';

import { ReactiveFormsModule, FormBuilder } from '@angular/forms';

import { SharedPageModule } from 'src/app/shared/shared.module'
import { AngularFireAuth } from '@angular/fire/auth';

const mockAuthentication ={
  registerUser: () => {
    return new Promise((resolve) => {
      resolve([]);
    });
  },
  loginEmailUser: () => {
    return new Promise((resolve) => {
      resolve([]);
    });
  },
  loginGoogleUser: () => {
    return new Promise((resolve) => {
      resolve([]);
    });
  },
  logoutUser: () => {
    return [];
  },
  isAuth:  () => {
    return empty();
  },
  updateUserData: () => {
    return [];
  },
};

const authStub: any = {
  authState: {},
  auth: {
    signInWithEmailAndPassword() {
      return Promise.resolve();
    }
  }
};

describe('RecoverPasswordPage', () => {
  let component: RecoverPasswordPage;
  let fixture: ComponentFixture<RecoverPasswordPage>;
  
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RecoverPasswordPage ],
      imports: [IonicModule.forRoot(),ReactiveFormsModule, SharedPageModule, RouterTestingModule],
      providers: [
        FormBuilder,
        AuthService,
        { provide: AngularFireAuth, useValue: authStub },
        { provide: AuthService, useValue: mockAuthentication }
        
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(RecoverPasswordPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
