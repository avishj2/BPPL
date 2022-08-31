import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LandRatesComponent } from './land-rates.component';

const routes: Routes = [
  {
    path: '',
    component: LandRatesComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LandRatesRoutingModule { }