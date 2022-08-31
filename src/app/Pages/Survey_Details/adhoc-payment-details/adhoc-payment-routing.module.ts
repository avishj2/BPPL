import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdhocPaymentDetailsComponent } from './adhoc-payment-details.component';

const routes: Routes = [
  {
    path: '',
    component: AdhocPaymentDetailsComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdhocPaymentRoutingModule { }