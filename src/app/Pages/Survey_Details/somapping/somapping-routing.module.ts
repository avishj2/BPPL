import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SOMappingComponent } from './somapping.component';

const routes: Routes = [
  {
    path: '',
    component: SOMappingComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SOMappingRoutingModule { }