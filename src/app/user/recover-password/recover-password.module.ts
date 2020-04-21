import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule} from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RecoverPasswordPageRoutingModule } from './recover-password-routing.module';

import { RecoverPasswordPage } from './recover-password.page';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    // FormsModule,
    IonicModule,
    RecoverPasswordPageRoutingModule
  ],
  declarations: [RecoverPasswordPage]
})

// eslint-disable-next-line require-jsdoc
export class RecoverPasswordPageModule {}
