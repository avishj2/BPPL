import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LAQPermanentComponent } from './laqpermanent.component';

const routes: Routes = [
  {
    path: '',
    component: LAQPermanentComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LAQPermanentRoutingModule { }