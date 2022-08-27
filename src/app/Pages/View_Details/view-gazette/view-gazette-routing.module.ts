import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ViewGazetteComponent } from './view-gazette.component';

const routes: Routes = [
  {
    path: '',
    component: ViewGazetteComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ViewGazetteRoutingModule { }