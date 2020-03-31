import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule ,ReactiveFormsModule} from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditCentersPageRoutingModule } from './edit-centers-routing.module';

import { EditCentersPage } from './edit-centers.page';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    IonicModule,
    EditCentersPageRoutingModule
  ],
  declarations: [EditCentersPage]
})
export class EditCentersPageModule {}
