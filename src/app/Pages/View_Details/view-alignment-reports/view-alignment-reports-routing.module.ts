import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ViewAlignmentReportsComponent } from './view-alignment-reports.component';

const routes: Routes = [
  {
    path: '',
    component: ViewAlignmentReportsComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ViewAlignmentReportsRoutingModule { }