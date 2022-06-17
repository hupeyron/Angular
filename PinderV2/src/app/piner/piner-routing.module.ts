import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PinerPage } from './piner.page';


const routes: Routes = [
  {
    path: '',
    component: PinerPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PinerPageRoutingModule {}
