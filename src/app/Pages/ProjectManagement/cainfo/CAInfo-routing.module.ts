import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CAInfoComponent } from './cainfo.component';


const routes: Routes = [
  {
    path: '',
    component: CAInfoComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CAInfoRoutingModule { }