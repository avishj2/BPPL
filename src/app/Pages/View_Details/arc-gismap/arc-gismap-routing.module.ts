import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ArcGISMapComponent } from './arc-gismap.component';

const routes: Routes = [
  {
    path: '',
    component: ArcGISMapComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ArcGISMapRoutingModule { }