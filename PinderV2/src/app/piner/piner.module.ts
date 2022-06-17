import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {SwipeCardLibModule} from 'ng-swipe-card';

import { IonicModule } from '@ionic/angular';

import { PinerPageRoutingModule } from './piner-routing.module';

import { PinerPage } from './piner.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PinerPageRoutingModule,
    SwipeCardLibModule
  ],
  declarations: [PinerPage]
})
export class PinerPageModule {}
