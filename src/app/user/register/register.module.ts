import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {  ReactiveFormsModule,  } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RegisterPageRoutingModule } from './register-routing.module';
// import { TooltipsModule } from 'ionic-tooltips';

import { RegisterPage } from './register.page';

@NgModule({
  imports: [
    CommonModule,
    // TooltipsModule.forRoot(),
    ReactiveFormsModule,
    IonicModule,
    RegisterPageRoutingModule,
    
  
  ],
  declarations: [RegisterPage]
  
})
// eslint-disable-next-line require-jsdoc
export class RegisterPageModule {}
