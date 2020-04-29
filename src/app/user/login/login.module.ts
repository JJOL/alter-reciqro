import { SharedPageModule } from 'src/app/shared/shared.module';
import { ToolbarComponent } from './../../shared/toolbar/toolbar.component';
import { AuthService } from './../../core/services/auth.service';

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';


import { IonicModule } from '@ionic/angular';

import { LoginPageRoutingModule } from './login-routing.module';

import { LoginPage } from './login.page';

@NgModule({
  imports: [
    CommonModule,
    // FormsModule,
    ReactiveFormsModule,
    IonicModule,
    LoginPageRoutingModule,
    SharedPageModule
  ],
  declarations: [LoginPage],
  providers: [AuthService]
})
// eslint-disable-next-line require-jsdoc
export class LoginPageModule {}
