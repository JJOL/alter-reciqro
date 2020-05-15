import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { AddVisitPageRoutingModule } from './add-visit-routing.module';
import { AddVisitPage } from './add-visit.page';
import { QrscannerComponent } from 'src/app/shared/qrscanner/qrscanner.component';
import { SharedPageModule } from 'src/app/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddVisitPageRoutingModule,
    SharedPageModule
  ],
  declarations: [AddVisitPage, QrscannerComponent]
})
export class AddVisitPageModule {}
