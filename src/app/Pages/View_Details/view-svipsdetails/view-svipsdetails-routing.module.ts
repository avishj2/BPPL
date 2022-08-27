import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ViewSVIPSDetailsComponent } from './view-svipsdetails.component';

const routes: Routes = [
  {
    path: '',
    component: ViewSVIPSDetailsComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ViewSVIPSRoutingModule { }