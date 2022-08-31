import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { OLGSPageComponent } from './olgspage.component';

const routes: Routes = [
  {
    path: '',
    component: OLGSPageComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OLGSPageRoutingModule{ }