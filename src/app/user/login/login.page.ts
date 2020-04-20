import { AuthService } from './../../core/services/auth.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import {AngularFireAuth} from '@angular/fire/auth';
import { auth } from 'firebase/app'; 

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  public email: string;
  public password: string;
  constructor(public afAuth: AngularFireAuth,private router: Router, private authService: AuthService) { }

  ngOnInit() {
  }

  onLogin(): void {
    console.log(this.email,this.password);
    this.authService.loginEmailUser(this.email, this.password)
    .then( (res)=> {
      this.router.navigate(['user/places-searcher-page']);
    } ).catch (err => console.log(err));
  }

  onLoginGoogle(): void{
    //console.log("Entro a google");
    //this.afAuth.auth.signInWithPopup(new auth.GoogleAuthProvider());
    this.authService.loginGoogleUser()
    .then((res)=> {
    this.router.navigate(['user/places-searcher-page']);
    }).catch (err => console.log(err));
  }

  onLogout(){
    //console.log("Salio a google");
    this.authService.logoutUser();
  }

}
