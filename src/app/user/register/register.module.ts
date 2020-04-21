import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormGroup } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RegisterPageRoutingModule } from './register-routing.module';

import { RegisterPage } from './register.page';

@NgModule({
  imports: [
    CommonModule,
    
    ReactiveFormsModule,
    // FormsModule,
    IonicModule,
    RegisterPageRoutingModule,
    
  
  ],
  declarations: [RegisterPage]
  
})
// eslint-disable-next-line require-jsdoc
export class RegisterPageModule {}
