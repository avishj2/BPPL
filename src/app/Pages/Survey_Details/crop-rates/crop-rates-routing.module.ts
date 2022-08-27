import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {CropRatesComponent } from './crop-rates.component';

const routes: Routes = [
  {
    path: '',
    component: CropRatesComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CropRatesRoutingModule { }