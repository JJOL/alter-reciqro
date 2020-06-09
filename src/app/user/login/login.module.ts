
import { SharedPageModule } from 'src/app/shared/shared.module';
// import { TooltipsModule } from 'ionic-tooltips';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { LoginPageRoutingModule } from './login-routing.module';
import { LoginPage } from './login.page';
import { AvisoPrivacidadPage } from './aviso-privacidad/aviso-privacidad.page';
import { AvisoPrivacidadPageModule } from './aviso-privacidad/aviso-privacidad.module';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    IonicModule,
    LoginPageRoutingModule,
    SharedPageModule,
    AvisoPrivacidadPageModule
  ],
  declarations: [LoginPage],
  entryComponents: [AvisoPrivacidadPage]
})
// eslint-disable-next-line require-jsdoc
export class LoginPageModule {}
