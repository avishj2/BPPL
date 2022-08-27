import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { SharedModule } from '../../../SharedModule';
import { ViewSVIPSRoutingModule } from './view-svipsdetails-routing.module';
import { ViewSVIPSDetailsComponent } from './view-svipsdetails.component';
import { DataTablesModule } from 'angular-datatables';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';

@NgModule({
  imports: [
    CommonModule,
    ViewSVIPSRoutingModule,
    FormsModule,ReactiveFormsModule ,
    SharedModule,
    NgbModule,
    DataTablesModule,
    NgSelectModule,
  ],
  declarations: [ViewSVIPSDetailsComponent],

})
export class ViewSVIPSModule { }