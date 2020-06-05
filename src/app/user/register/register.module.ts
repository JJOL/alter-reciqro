import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {  ReactiveFormsModule, FormsModule,  } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RegisterPageRoutingModule } from './register-routing.module';
// import { TooltipsModule } from 'ionic-tooltips';

import { RegisterPage } from './register.page';
import { AvisoPrivacidadPage } from '../login/aviso-privacidad/aviso-privacidad.page';
import { AvisoPrivacidadPageModule } from '../login/aviso-privacidad/aviso-privacidad.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    RegisterPageRoutingModule,
    AvisoPrivacidadPageModule  
  ],
  declarations: [RegisterPage],
  entryComponents: [AvisoPrivacidadPage]
  
})
// eslint-disable-next-line require-jsdoc
export class RegisterPageModule {}
