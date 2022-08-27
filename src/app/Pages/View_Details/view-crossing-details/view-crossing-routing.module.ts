import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ViewCrossingDetailsComponent } from './view-crossing-details.component';

const routes: Routes = [
  {
    path: '',
    component: ViewCrossingDetailsComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ViewCrossingDetailsRoutingModule { }