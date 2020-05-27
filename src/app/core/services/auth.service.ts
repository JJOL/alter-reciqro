/* eslint-disable @typescript-eslint/no-magic-numbers */
/* eslint-disable eqeqeq */
/* eslint-disable camelcase */
import { empty } from 'rxjs';
import { ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
import { Observable, Subscription, BehaviorSubject } from 'rxjs';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestoreDocument} from '@angular/fire/firestore';
import { User } from '../models/user.model';
import { map, take } from 'rxjs/operators';
import { auth } from 'firebase';
import { SystemService } from './system.service';

const USER_KEY = '/users';
@Injectable({
  providedIn:'root'
})
/** 
 * AuthService for auth operations
 */
export class AuthService {
  auxiliar: string;
  user: Observable<User>;
  isUserLoggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean> (false);
  userRoles: BehaviorSubject<any> = new BehaviorSubject<any> (empty);
  
  /**
   * @param  {AngularFireAuth} privateafAuth
   * @param  {SystemService} privateafs
   * @param  {Router} privaterouter
   * @param  {ToastController} privatetoastCtrl
   * Constructor for the auth.service.ts
   */
  constructor(private afAuth: AngularFireAuth,
              private afs: SystemService,
              private router: Router,
              private toastCtrl: ToastController) {
    this.getCurrentUser()
        .then(user => {
          if (user) {
            this.isUserLoggedIn.next(true);
            this.userRoles.next(user.roles);
          }
        }).catch(() => {
          this.isUserLoggedIn.next(false);
          this.userRoles.next([]);
        });
  }
  /**
   * User Story ID: M4NG2
   * Get email of the current user
   */
  getUserMail() {
    let user = this.afAuth.auth.currentUser;
    if (user) {
      return user.email;
    } else { return ''; }
  }

  /**
   * User Story ID: M1NCx
   * Function for the storage of session variables
   */
  persist(){
    window.localStorage['splash'] = 'active';
  }

  /**
   * User Story ID: M4NC1
   * Input is the form values and creates the user with a promise using the services of firebase authentication
   * @param  {any} userObject
   */
  registerUser(userObject) {
    return new Promise((resolve , reject) => {
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
   * UserStoryID: M4NC1
   * Creates the user with its additional information,
   * inputs the form values, the user id and creates a promise with the services of firebase firestore 
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
   * User Story ID: M4NC2, M4NG1
   * Returns a promise that uses auth firebase methods to login with email and user
   * @param  {string} email
   * @param  {string} password
   */
  loginEmailUser(email: string, password: string) {
    return new Promise((resolve, reject) => {
      this.afAuth.auth.signInWithEmailAndPassword(email, password)
          .then(userData => {
            resolve(userData);
            this.isUserLoggedIn.next(true);
            this.getUserByUID(userData.user.uid).then(user => {
              this.userRoles.next(user.roles);
              this.showToast('Bienvenido a ReciQro');
            });
          },
          err => reject(err)
          );
    });
  }
  /**
   * USID: M4NC1,M4NC2, M4NG1
   * Pop ups a google form from the google provider in order to sign up or login
   */
  async loginGoogleUser() {
    return this.afAuth.auth.signInWithPopup(new auth.GoogleAuthProvider())
        .then(async (credential) => {
          await this.updateUserData(credential.user);
          this.isUserLoggedIn.next(true);
          this.getUserByUID(credential.user.uid).then(user => {
            this.userRoles.next(user.roles);
            this.showToast('Bienvenido a ReciQro');
          });
        });
  }
  /**
   * User Story ID: M4NC4, M4NG3
   *  Firebase function that ends user session and redirect to principal view
   */
  logoutUser() {
    this.userRoles.next([]);
    return this.afAuth.auth.signOut().then(async () => {
      this.isUserLoggedIn.next(false);
      //console.log('lel',this.userRoles.value,'lol',this.isUserLoggedIn.value)
      await this.router.navigate(['user/login']);
      this.showToast('Hasta luego, has cerrado sesión');
      window.location.reload();
    });
  }
  /**
   * User Story ID: M4NC2
   * Returns Observable of the User state if is authenticated
   */
  isAuth() {
    return this.afAuth.authState.pipe(map(auth =>  auth));
  }
  
  /**
   * User Story ID: M4NC2
   * Returns the user info by uid
   * @param  {string} uid
   */
  getUserByUID(uid:string):Promise<any>{
    if (uid) {
      return new Promise((resolve) => {
        let subscription: Subscription;
        subscription = this.afs.doc<any>(`users/${uid}`).valueChanges()
            .pipe(
                take(1),
                map(
                    user => {
                      if (user) {
                        user.id = uid;
                      }
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
    } else { return;
    }
  }

  /**
   * User Story ID: M4NC2
   * Updateuserdata:
   * Updates user data in case there is no information it is used in logingoogle method
   * @param  {} user
   */
  async updateUserData(user){
    let userconfirmation= await this.getUserByUID(user.uid);
    if (!userconfirmation) {
      const userGoogle: User = {
        alias: 'no name',
        delegation_id: 'sLiPWGpvVzATetdO7CD9',
        points: 0,
        roles: ['user']
      };
      this.createUser(userGoogle,user.uid);
    } else {
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
  }

  /**
   * Updates the user's info based on UID 
   * @param  {string} uid
   * @param  {any} user
   * @returns Promise
   */
  updateUserByUID(uid:string, user:any):Promise<any>{
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(`users/${uid}`);
    return userRef.set(user, {merge: true});
  }

  /**
   * User Story ID: M4NG1
   *  Gets the current logged user
   * 
   * @returns Promise
   */
  getCurrentUser():Promise<any>{
    return new Promise((resolve, reject) => {
      let subscription: Subscription;
      subscription = this.afAuth.authState.pipe(map(auth => auth)).subscribe( user => {
        if (subscription) {
          subscription.unsubscribe();
        }
        resolve(this.getUserByUID(user?user.uid:null));
      });
    });
  }
  /**
   * User story ID: M4NG2,M4NC3
   * Description: It sends an email to the user, so they can reset their password
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
   * User Story ID: M4NG4
   * Metodo Registra staff, toma como entrada el objeto del form y crea una promesa con los servicio de autenticacion de firebase
   * @param  {any} userObject
   */
  registerStaff(userObject) {
    return new Promise((resolve , reject) => {
      this.afAuth.auth.createUserWithEmailAndPassword(userObject.email, userObject.password)
          .then(userData => {
            resolve(userData),
            this.createStaff(userObject, userData.user.uid);
          // eslint-disable-next-line no-console
          }).catch(err => console.log(reject(err)));
    });
  }
  /**
   * UserStoryID: M4NG4
   * Metodo crea staff en la tabla users con su informacion adicional, 
   * toma como entrada el form y el userUID que se creo y crea una promesa con los servicio de firestore firebase
   * @param  {any} userObject
   * @param  {string} userUID
   */ 
  createStaff(userObject, userUID){
    return new Promise<any>((resolve, reject) => {
      this.afs.collection(USER_KEY).doc(userUID).set({
        alias: userObject.alias,
        points: 0,
        roles: ['staff','user'],
        delegation_id: userObject.delegationId,
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
   * Show a toast
   * USID: M4NC2
   * USID: M4NC2
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
