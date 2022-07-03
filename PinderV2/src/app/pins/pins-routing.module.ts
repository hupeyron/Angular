import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PinsPage } from './pins.page';

const routes: Routes = [
  {
    path: '',
    component: PinsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PinsPageRoutingModule {}
