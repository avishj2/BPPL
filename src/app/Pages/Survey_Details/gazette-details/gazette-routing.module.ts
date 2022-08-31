import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GazetteDetailsComponent } from './gazette-details.component';

const routes: Routes = [
  {
    path: '',
    component: GazetteDetailsComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GazetteRoutingModule { }