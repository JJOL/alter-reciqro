import { resolve } from 'url';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { Injectable } from '@angular/core';
import {AngularFireAuth} from '@angular/fire/auth';
import {AngularFirestore , AngularFirestoreDocument} from '@angular/fire/firestore';
import { User } from '../models/user.model';
import { switchMap, map } from 'rxjs/operators';
import { auth } from 'firebase';

const USER_KEY = '/users';
@Injectable()
/** Servicio para autenticaciom de usuario */
export class AuthService {
  user: Observable<User>;
  // eslint-disable-next-line require-jsdoc
  constructor(private afAuth: AngularFireAuth,
              private afs: AngularFirestore) {
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
            this.createUser(userObject,userData.user.uid);
            this.loginEmailUser(userObject.email,userObject.password);
          // eslint-disable-next-line no-console
          }).catch(err => console.log(reject(err)));
    });
    
  }
  //UserStoryID: M4NC1
  /**
   * Metodo crea usuario en la tabla users con su informacion adicional, toma como entrada el form y el userUID que se creo y crea una promesa con los servicio de firestore firebase
   * @param  {any} userObject
   * @param  {string} userUID
   */ 
  createUser(userObject,userUID){
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
      this.afAuth.auth.signInWithEmailAndPassword(email,password)
          .then(userData =>  resolve(userData),
              err => reject(err));
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
          this.updateUserData(credential.user)
        });
  }
  /**
   * Metodo Logout: Uso de servicio de autentificacion de firebase para poder terminar la sesion
   */
  logoutUser() {
    return this.afAuth.auth.signOut();
  }
  /**
   * Metodo para saber si el usuario se encuentra autentificado
   */
  isAuth() {
    return this.afAuth.authState.pipe(map(auth => auth));
  }

  /**
   * Metodo updateuserdata:
   * recibe un usuario el cual se le modificaran los atributos para cuando se agreagn usuarios nuevos con un rol especifico
   * @param  {} user
   */
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
    };
    return userRef.set(data, {merge: true});
  }

  //Description: It sends an email to the user, so they can reset their password
  //User story ID: M4NG2 
  //User story ID: M4NC3
  /**
   * Metodo para enviar email de restauracion de la contraseña. Recibe el email al que se va enviar el correo.
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
}
