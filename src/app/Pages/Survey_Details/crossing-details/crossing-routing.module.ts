import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CrossingDetailsComponent } from './crossing-details.component';

const routes: Routes = [
  {
    path: '',
    component: CrossingDetailsComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CrossingRoutingModule { }