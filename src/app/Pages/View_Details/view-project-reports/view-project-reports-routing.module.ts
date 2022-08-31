import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ViewProjectReportsComponent } from './view-project-reports.component';

const routes: Routes = [
  {
    path: '',
    component: ViewProjectReportsComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ViewProjectRoutingModule { }