import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ViewAwardReportsComponent } from './view-award-reports.component';

const routes: Routes = [
  {
    path: '',
    component: ViewAwardReportsComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ViewAwardReportsRoutingModule { }