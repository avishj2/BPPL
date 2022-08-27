import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {VillageDetailsComponent } from './village-details.component';

const routes: Routes = [
  {
    path: '',
    component: VillageDetailsComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VillageDetailsRoutingModule { }