import { Injectable } from '@angular/core';
import { AngularFirestore,  } from '@angular/fire/firestore';
import * as firebase from 'firebase/app';
import { LoginSession } from '../models/login-session';
// import { AuthMemoryService } from './auth-memory.service';
import { AngularFireAuth } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root',
  // useClass: AuthMemoryService
})



export class AuthService {
  constructor(
    private afAuth: AngularFireAuth) {
  }
  // abstract login(username: string, password: string): boolean;

  // abstract logout(): void;

  // abstract getLoggedSession(): LoginSession;


  //Description: It sends an email to the user, so they can reset their password
  //User story ID: M4NG2 
  sendPasswordResetEmail(email: string){
    return new Promise<any>((resolve, reject) => {
      this.afAuth.auth.sendPasswordResetEmail(email).then(
       (res) => {
         resolve(res);
       },
       err => reject(err)
     );
   });

  }
}
