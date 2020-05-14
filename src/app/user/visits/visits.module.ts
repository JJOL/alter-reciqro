import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { VisitsPageRoutingModule } from './visits-routing.module';
import { VisitsPage } from './visits.page';
import { SharedPageModule } from 'src/app/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    VisitsPageRoutingModule,
    SharedPageModule
  ],
  declarations: [VisitsPage]
})
export class VisitsPageModule {}
