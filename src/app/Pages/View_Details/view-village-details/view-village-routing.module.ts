import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ViewVillageDetailsComponent } from './view-village-details.component';

const routes: Routes = [
  {
    path: '',
    component: ViewVillageDetailsComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ViewVillageRoutingModule { }