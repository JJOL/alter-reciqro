/* eslint-disable @typescript-eslint/no-magic-numbers */
/* eslint-disable eqeqeq */
/* eslint-disable camelcase */
import { ToastController } from '@ionic/angular';
import { resolve } from 'url';
import { Router } from '@angular/router';
import { Observable, of, Subscription } from 'rxjs';
import { Injectable } from '@angular/core';
import {AngularFireAuth} from '@angular/fire/auth';
import {AngularFirestore , AngularFirestoreDocument} from '@angular/fire/firestore';
import { User } from '../models/user.model';
import { switchMap, map, take } from 'rxjs/operators';
import { auth } from 'firebase';

const USER_KEY = '/users';
@Injectable()
/** Servicio para autenticaciom de usuario */
export class AuthService {
  auxiliar: string;
  user: Observable<User>;
  // eslint-disable-next-line require-jsdoc
  constructor(private afAuth: AngularFireAuth,
              private afs: AngularFirestore,
              private router: Router,
              private toastCtrl: ToastController) {
  }
  //User Story ID: M4NC1
  /**
   * Metodo Registra usuario, toma como entrada el objeto del form y crea una promesa con los servicio de autenticacion de firebase
   * @param  {any} userObject
   */
  registerUser(userObject) {
    return new Promise((resolve , reject) => {
      console.log(userObject.email)
      this.afAuth.auth.createUserWithEmailAndPassword(userObject.email, userObject.password)
          .then(userData => {
            resolve(userData),
            this.createUser(userObject, userData.user.uid);
            this.loginEmailUser(userObject.email, userObject.password);
          // eslint-disable-next-line no-console
          }).catch(err => console.log(reject(err)));
    });
    
  }
  
  /**
   * * USID: M4NC2
   * UserStoryID: M4NC1
   * Metodo crea usuario en la tabla users con su informacion adicional, toma como entrada el form y el userUID que se creo y crea una promesa con los servicio de firestore firebase
   * @param  {any} userObject
   * @param  {string} userUID
   */ 
  createUser(userObject, userUID){
    return new Promise<any>((resolve, reject) => {
      this.afs.collection(USER_KEY).doc(userUID).set({
        alias: userObject.alias,
        points: 0,
        roles: ['user'],
        delegation_id: userObject.delegation_id,
      })
          .then(
              (res) => {
                resolve(res);
              },
              err => reject(err)
          );
    });
  }
  /**
   * USID: M4NC2
   * Returns a promise that uses auth firebase methods to login with email and user
   * @param  {string} email
   * @param  {string} password
   */
  loginEmailUser(email: string, password: string) {
    return new Promise((resolve, reject) => {
      this.afAuth.auth.signInWithEmailAndPassword(email, password)
          .then(userData => {
            resolve(userData);
            this.showToast('Bienvenido a ReciQro');
          },
          err => reject(err)
          );
    });
  }
  /**
   * USID: M4NC2
   * Pop up a google form of a google provider in order to sign up or login
   */
  loginGoogleUser() {
    return this.afAuth.auth.signInWithPopup(new auth.GoogleAuthProvider())
        .then((credential) => {
          this.updateUserData(credential.user);
          this.showToast('Bienvenido a ReciQro');
        });
  }
  /**
   * USID: M4NC4
   *  Firebase function that ends user session and redirect to princiapl view
   */
  logoutUser() {
    return this.afAuth.auth.signOut().then(() => {
      this.router.navigate(['user/places-searcher-page']);
      this.showToast('Hasta luego, has cerrado sesión');
    });
  }
  /**
   * USID: M4NC2
   * Returns Observable of the User state if is authenticated
   */
  isAuth() {
    return this.afAuth.authState.pipe(map(auth =>  auth));
  }
  /**
   * USID: M4NC2
   * Returns the user info by uid
   * @param  {string} iud
   */
  getUserByUID(uid:string):Promise<any>{
    return new Promise((resolve) => {
      let subscription: Subscription;
      subscription = this.afs.doc<any>(`users/${uid}`).valueChanges()
          .pipe(
              take(1),
              map(
                  user => {
                    return user;
                  }
              ))
          .subscribe(user => {
            if (subscription) {
              subscription.unsubscribe();
            }
            resolve(user);
          });
    });
  }

  /**
   * USID: M4NC2
   * Updateuserdata:
   * Updates user data in case there is no information it is used in logingoogle method
   * @param  {} user
   */
  async updateUserData(user){
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(`users/${user.uid}`);
    let galias: string;
    let gdelegation_id: string ;
    let gpoints: number ;
    let groles: [string];
    const useraux = await this.getUserByUID(user.uid);
    galias = useraux.alias;
    gdelegation_id = useraux.delegation_id;
    gpoints = useraux.points;
    groles = useraux.roles;
    if ('' === galias) {
      galias = 'no name';
    }
    if ('' === gdelegation_id) {
      gdelegation_id = 'sLiPWGpvVzATetdO7CD9';
    }
    if (0 >= gpoints) {
      gpoints = 0;
    }
    if (groles.length < 0) {
      groles = ['user'];
    }
    const data: User = {
      alias: galias,
      delegation_id: gdelegation_id,
      points: gpoints,
      roles: groles
    };
    return userRef.set(data, {merge: true});
  }

  /**
   * Updates the user's info based on UID 
   * @param  {string} uid
   * @param  {any} user
   * @returns Promise
   */
  updateUserByUID(uid:string, user:any):Promise<any>{
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(`users/${uid}`);
    console.log(user)
    return userRef.set(user, {merge: true});
  }

  /**
   *  Gets the current logged user
   * USID: M4NC2
   * @returns Promise
   */
  getCurrentUser():Promise<any>{
    return new Promise((resolve) => {
      let subscription: Subscription;
      subscription = this.afAuth.authState.pipe(map(auth => auth)).subscribe( user =>
      {
        if (subscription) {
          subscription.unsubscribe();
        }
        resolve(this.getUserByUID(user?user.uid:null));
      }
      );
    });
  }

  
  /**
   * Description: It sends an email to the user, so they can reset their password
   * User story ID: M4NG2 
   * User story ID: M4NC3
   * 
   * @param  {string} email
   */
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
  /**
   * Updates the current info user information
   * @param  {} user
   */
  async updateCurrentUser(data){
    return new Promise((resolve) => {
      let subscription: Subscription;
      subscription = this.afAuth.authState.pipe(map(auth => auth)).subscribe( user =>
      {
        if (subscription) {
          subscription.unsubscribe();
        }
        resolve(this.updateUserByUID(user?user.uid:null,data));
      }
      );
    });
  }
  


  /**
   * Method that get the roles of the current user in order to set fynamic menu
   */
  async getRolesandSession() {
    let islogged: boolean;
    let admin: boolean;
    let staff: boolean;
    let user: boolean;
    let roles = [];
    const useraux = await this.getCurrentUser();
    if ( useraux) { islogged = true;  roles = useraux.roles;} else { islogged = false; }
    if ( roles.indexOf('user') >= 0) { user = true; } else { user = false; }
    if ( roles.indexOf('admin') >= 0) { admin = true; } else { admin = false; }
    if ( roles.indexOf('staff') >= 0) { staff = true; } else { staff = false; }
    return [islogged,admin,staff,user];
  }

  /**
   * Show a toast
   * @param  {} msg
   */
  showToast(msg) {
    this.toastCtrl.create({
      message: msg,
      duration: 3000,
      position: 'middle',
      color: 'success'
    }).then(toast => toast.present());
  }
}
