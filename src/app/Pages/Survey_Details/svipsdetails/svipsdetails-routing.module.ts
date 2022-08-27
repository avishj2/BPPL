import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {SVIPSDetailsComponent } from './svipsdetails.component';

const routes: Routes = [
  {
    path: '',
    component: SVIPSDetailsComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SVIPSDetailsRoutingModule { }