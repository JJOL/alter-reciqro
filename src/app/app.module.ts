import { SharedPageModule } from 'src/app/shared/shared.module';

import { FormsModule } from '@angular/forms';
import { AngularFireAuth } from 'angularfire2/auth';
import { NgModule } from '@angular/core';
import { BrowserModule,Title,Meta } from '@angular/platform-browser';
import { RouteReuseStrategy, RouterModule } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule, FirestoreSettingsToken } from '@angular/fire/firestore';
import { AngularFireAuthModule } from '@angular/fire/auth';

import { environment } from '../environments/environment';
import { SplashscreenPageModule } from './user/splashscreen/splashscreen.module';
import {NgxPaginationModule} from 'ngx-pagination'; 

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    FormsModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.database.firebaseConfig),
    AngularFirestoreModule,
    AngularFireAuthModule,
    SharedPageModule,
    SplashscreenPageModule,
    NgxPaginationModule
  ],
  providers: [
    Title,
    Meta,
    StatusBar,
    SplashScreen,
    AngularFireAuth,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    { provide: FirestoreSettingsToken, useValue: {} }
  ],
  bootstrap: [AppComponent]
})
// eslint-disable-next-line require-jsdoc
export class AppModule {}
