import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { DataTablesModule } from 'angular-datatables';
import { NgSelectModule } from '@ng-select/ng-select';
import { SharedModule } from '../../../SharedModule';
import { SVIPSDetailsRoutingModule } from './svipsdetails-routing.module';
import {SVIPSDetailsComponent } from './svipsdetails.component';

@NgModule({
  imports: [
    CommonModule,
    SVIPSDetailsRoutingModule,
    FormsModule,ReactiveFormsModule ,
    NgbModule,
    DataTablesModule,
    NgSelectModule,
    SharedModule
  ],
  declarations: [SVIPSDetailsComponent],

})
export class SVIPSDetailsModule { }