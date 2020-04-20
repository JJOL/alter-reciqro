import { resolve } from 'url';
/* eslint-disable require-jsdoc */
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { Injectable } from '@angular/core';
import {AngularFireAuth} from '@angular/fire/auth';
import {AngularFirestore , AngularFirestoreDocument} from '@angular/fire/firestore';
import { User } from '../models/user.model';
import { switchMap, map } from 'rxjs/operators';
import { auth } from 'firebase';

@Injectable()

export class AuthService {
  user: Observable<User>;
  constructor(private afAuth: AngularFireAuth,
              private afs: AngularFirestore) {
  }
  
  registerUser(email: string,pass: string) {
    return new Promise((resolve, reject)=> {
      this.afAuth.auth.createUserWithEmailAndPassword(email,pass)
          .then(userData => {
            resolve(userData),
            this.updateUserData(userData.user);
          // eslint-disable-next-line no-console
          }).catch(err => console.log(reject(err)));
    });
  }
  loginEmailUser(email: string, password: string) {
    return new Promise ((resolve, reject) => {
      this.afAuth.auth.signInWithEmailAndPassword(email,password)
          .then(userData =>  resolve(userData),
            err => reject(err));
    });
  }
  loginGoogleUser() {
    return this.afAuth.auth.signInWithPopup(new auth.GoogleAuthProvider())
        .then((credential) => {
          this.updateUserData(credential.user)
        });
  }
  logoutUser() {
    return this.afAuth.auth.signOut();
  }

  isAuth() {
    return this.afAuth.authState.pipe(map(auth => auth));
  }


  private updateUserData(user){
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(`users/${user.uid}`);
    const data: User = {
      alias: user.uid,
      delegation_id: "",
      points: 0,
      //email: user.email,
      roles: {
        admin: true
      }
    }
    return userRef.set(data, {merge: true})
  }
}
