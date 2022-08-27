import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { LandRatesRoutingModule} from './land-rates-routing.module';
import {LandRatesComponent } from './land-rates.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { DataTablesModule } from 'angular-datatables';
import { NgSelectModule } from '@ng-select/ng-select';
import { SharedModule } from '../../../SharedModule';

@NgModule({
  imports: [
    CommonModule,
    LandRatesRoutingModule,
    FormsModule,ReactiveFormsModule ,
    NgbModule,
    DataTablesModule,
    NgSelectModule,
    SharedModule
  ],
  declarations: [LandRatesComponent],

})
export class LandRatesModule { }