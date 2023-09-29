import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AlignmentsheettestComponent } from './alignmentsheettest.component';

const routes: Routes = [
  {
    path: '',
    component: AlignmentsheettestComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AlignmentTestRoutingModule { }