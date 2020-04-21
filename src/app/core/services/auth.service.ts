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
  /**
   * Metodo Registra usuario, toma como entrada email y correo y crea una promesa con los servicio de autenticacionde firebase
   * @param  {string} email
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
   * Metodo Registra usuario, toma como entrada email y correo y crea una promesa con los servicio de autenticacionde firebase
   * @param  {string} email
   * @param  {string} pass
   */ 
  createUser(userObject, userUID){
    return new Promise<any>((resolve, reject) => {
      this.afs.collection(USER_KEY).doc(userUID).set({
        alias: userObject.alias,
        points: 0,
        roles: ["user"],
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
   * Metodo Login usando solo email y password
   * Regresa una promesa la cual usa los servicio de autenticacion de firebase
   * @param  {string} email
   * @param  {string} password
   */
  loginEmailUser(email: string, password: string) {
    return new Promise ((resolve, reject) => {
      this.afAuth.auth.signInWithEmailAndPassword(email, password)
          .then(userData => {
            resolve(userData);
            this.showToast('Bienvenido a ReciQro');
          });
    });
  }
  /**
   * Metodo Login con Google
   * Despliega un popup de google el cual se llama a partir de un google provider
   * regresa la informacion del usuario
   */
loginGoogleUser() {
    return this.afAuth.auth.signInWithPopup(new auth.GoogleAuthProvider())
        .then((credential) => {
          this.updateUserData(credential.user);
          this.showToast('Bienvenido a ReciQro');
        });
  }
  /**
   * Metodo Logout: Uso de servicio de autentificacion de firebase para poder terminar la sesion
   */
  logoutUser() {
    return this.afAuth.auth.signOut().then(() => {
      this.router.navigate(['user/places-searcher-page']);
      this.showToast('Hasta luego, has cerrado sesión');
    });
  }
  /**
   * Metodo para saber si el usuario se encuentra autentificado
   */
  isAuth() {
    return this.afAuth.authState.pipe(map(auth =>  auth));
  }
  /**
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
   * Metodo updateuserdata:
   * recibe un usuario el cual se le modificaran los atributos para cuando se agreagn usuarios nuevos con un rol especifico
   * @param  {} user
   */
  private updateUserData(user){
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(`users/${user.uid}`);
    let useraux=userRef.valueChanges()
    let galias: string =useraux.alias;
    let gdelegation_id: string = useraux.delegation_id;
    let gpoints: number = useraux.points;
    let groles: [string] = useraux.roles;
    console.log(useraux);
   if ('' == galias){
      galias = 'no name';
    }
    if ('' == gdelegation_id){
      gdelegation_id = 'sLiPWGpvVzATetdO7CD9';
    }
    if (0 >= gpoints){
      gpoints = 0;
    }
    if (0 >= groles.length) {
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


  //Description: It sends an email to the user, so they can reset their password
  //User story ID: M4NG2 
  /**
   * Metodo sendPasswordResetEmail:
   * 
   * @param  {} user
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
   * Metodo showtoast:
   *  creaun toast
   * para mostrar en pantalla
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
